import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

interface RequestBody {
  username: string
  password: string
}

interface AdminModel {
  findOne(where: object)
}

interface AdminRow {
  password: string
  dataValues: { password: string }
}

class AuthenticateAdminService {

  public static async authAdmin(reqBody: RequestBody, AdminModel: AdminModel): Promise<object> {
    const { username, password } = reqBody
    const adminRow: AdminRow = await AdminModel.findOne({ where: { username } })
    let token: object = {}
    if (adminRow !== null) {
      token = await AuthenticateAdminService.checkIfPasswordsMatch(password, adminRow)
    }
    return token
  }
  
  private static async checkIfPasswordsMatch(plainPassword: string, adminRow: AdminRow): Promise<object> {
    const isPasswordsMatch = await Promise.resolve(bcrypt.compare(plainPassword, adminRow.password))
    if (isPasswordsMatch) {
      const admin = AuthenticateAdminService.removePasswordPropFromAdminRow(adminRow)
      const token: object = { token: await AuthenticateAdminService.createToken(admin) }
      return token
    }
    else {
      const emptyResponse: object = {}
      return emptyResponse
    }
  }

  private static removePasswordPropFromAdminRow(adminRow: AdminRow): object {
    const { password, ...admin } = adminRow.dataValues
    return admin
  }

  private static async createToken(admin: object): Promise<string> {
    const token: string = await Promise.resolve(jwt.sign({ admin }, 'expressadminarea'))
    return token
  }
  
}

export default AuthenticateAdminService