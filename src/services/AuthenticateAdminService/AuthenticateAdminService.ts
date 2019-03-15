// import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { DataEncryptor } from '../../utilities/DataEncryptor/DataEncryptor'

type RequestBody = {
  username: string
  password: string
}

type AdminModel = {
  findOne(where: object): AdminRow
}

type AdminRow = {
  password: string
  dataValues: { password: string }
}

type Token = {
  token?: string
}

class AuthenticateAdminService {

  public static async authAdmin(reqBody: RequestBody, AdminModel: AdminModel): Promise<object> {
    const { username, password } = reqBody
    const adminRow: AdminRow = await AdminModel.findOne({ where: { username } })
    let token: Token = {}
    if (adminRow !== null) {
      token = await AuthenticateAdminService.checkIfPasswordsMatch(password, adminRow)
    }
    return token
  }
  
  private static async checkIfPasswordsMatch(plainPassword: string, adminRow: AdminRow): Promise<Token> {
    const isPasswordsMatch: boolean = await DataEncryptor.compare(plainPassword, adminRow.password)
    let token: Token = {}
    if (isPasswordsMatch) {
      const admin: object = AuthenticateAdminService.removePasswordPropFromAdminRow(adminRow)
      token = { token: await AuthenticateAdminService.createToken(admin) }
    }
    return token
  }

  private static removePasswordPropFromAdminRow(adminRow: AdminRow): object {
    const { password, ...admin } = adminRow.dataValues
    return admin
  }

  private static async createToken(admin: object): Promise<string> {
    const token: string = jwt.sign({ admin }, 'expressadminarea')
    return token
  }
  
}

export { AuthenticateAdminService }
