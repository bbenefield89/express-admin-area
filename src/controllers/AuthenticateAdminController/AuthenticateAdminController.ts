import { AuthenticateAdminService } from '../../services/AuthenticateAdminService/AuthenticateAdminService';

type RequestBody = {
  username?: string
  password?: string
  token?: string
}

type AdminModel = {
  findOne(where: object): AdminRow
}

type AdminRow = {
  password: string
  dataValues: { password: string }
}

type isTokenVerified = {
  status: number
  message: string
}

class AuthenticateAdminController {

  public static async authAdmin(req, res): Promise<void> {
    const reqBody: RequestBody = req.body
    const AdminModel: AdminModel = res.locals.databaseConnection.models['admin']
    const token: object = await AuthenticateAdminService.authAdmin(reqBody, AdminModel)
    res.status(200).send(token)
  }

  public static async verifyToken(req, res): Promise<void> {
    const token: string = req.body.token
    const AdminModel: AdminModel = res.locals.databaseConnection.models['admin']
    const isTokenVerified: isTokenVerified = await AuthenticateAdminService.verifyToken(token, AdminModel)
    res.status(isTokenVerified.status).send({ isTokenVerified: isTokenVerified.message })
  }
  
}

export default AuthenticateAdminController