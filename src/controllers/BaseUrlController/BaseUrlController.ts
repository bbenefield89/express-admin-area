class BaseUrlController {
  constructor() {}

  // GET: '/expressadminarea/baseurl'
  public static getDomainName(_req, res): any {
    res.send({ data: res.locals.baseUrl })
  }
  
}

export default BaseUrlController
