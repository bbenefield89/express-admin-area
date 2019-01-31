import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
import AuthenticateAdminService from '../services/AuthenticateAdminService/AuthenticateAdminService'
import BaseUrlController from './BaseUrlController/BaseUrlController'

class RoutesController {

  private static expressAdminArea: string = '/expressadminarea'
  private static router;

  public static registerAllRoutes(router: any): void {
    this.setRouter(router)
    // GET: 'expressadminarea/baseurl'
    this.registerBaseUrlRoutes()
    // GET: 'expressadminarea/authenticateadmin'
    this.registerAuthenticateAdminRoutes()
  }

  private static registerBaseUrlRoutes(): void {
    this.router.get(`${ this.expressAdminArea }/baseurl`, BaseUrlController.getDomainName)
  }

  private static registerAuthenticateAdminRoutes(): void {
    this.router.post(`${ this.expressAdminArea }/authenticateadmin`,
      AuthenticateAdminService.authenticateAdmin,
      AuthenticateAdminController.getAdminJwt
    )
  }

  private static setRouter(router) {
    this.router = router
  }
  
}

export default RoutesController
