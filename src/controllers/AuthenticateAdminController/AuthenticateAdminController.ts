import AuthenticateAdminService from '../../services/AuthenticateAdminService/AuthenticateAdminService';

interface RequestBody {
  username: string
  password: string
}

interface AdminModel {
  findOne(where: object)
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