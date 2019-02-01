class AuthenticateAdminController {

  constructor() {}

  public static getAdminJwt(_req, res): void {
    res.send({ data: res.locals.token })
  }
  
}

export default AuthenticateAdminController