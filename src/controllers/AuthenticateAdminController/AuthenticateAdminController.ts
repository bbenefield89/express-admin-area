import { AuthenticateAdminService } from '../../services/AuthenticateAdminService/AuthenticateAdminService';

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

class AuthenticateAdminController {

  public static async authAdmin(req, res): Promise<void> {
    const reqBody: RequestBody = req.body
    const AdminModel: AdminModel = res.locals.databaseConnection.models['admin']
    const token: object = await AuthenticateAdminService.authAdmin(reqBody, AdminModel)
    res.status(200).send(token)
  }
  
}

export default AuthenticateAdminController