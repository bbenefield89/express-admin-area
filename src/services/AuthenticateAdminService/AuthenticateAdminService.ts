import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { Admin } from '../../models/Admin'

class AuthenticateAdminService {

  public static async authenticateAdmin(req, res, next): Promise<void> {
    res.locals.token = { error: 'Username or password combination is incorrect' }
    const adminEntity = await AuthenticateAdminService.findAdminByUsername(req, res)
    const passwordsMatch: Boolean = await AuthenticateAdminService.checkIfPasswordsMatch(
      req.body.password,
      adminEntity.password
    )
    if (passwordsMatch) {
      res.locals.token = await AuthenticateAdminService.generateJwt(adminEntity)
    }
    next()
  }

  private static async findAdminByUsername(req, res): Promise<any> {
    const databaseConnection: Object = res.locals.databaseConnection
    const adminModel = Admin(databaseConnection)
    const findOneWhereClause: Object = { where: { username: req.body.username }}
    const adminEntity: Object = await adminModel.findOne(findOneWhereClause)
    return adminEntity
  }

  private static async checkIfPasswordsMatch(plainTextPw: String, hashedPw: String): Promise<Boolean> {
    return await bcrypt.compare(plainTextPw, hashedPw)
  }

  private static async generateJwt(adminEntity): Promise<String> {
    const { id, username }: { id: Number, username: String } = adminEntity
    const token: String = await jwt.sign({ id, username }, 'expressadminarea')
    return token
  }
  
}

export default AuthenticateAdminService