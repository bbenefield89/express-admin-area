import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
import AuthenticateAdminService from '../services/AuthenticateAdminService/AuthenticateAdminService'
import BaseUrlController from './BaseUrlController/BaseUrlController'

class RoutesController {

  static expressAdminArea: string = '/expressadminarea'

  public static registerAllRoutes(router: any): void {
    // GET: 'expressadminarea/baseurl'
    RoutesController.registerBaseUrlRoutes(router)
    // GET: 'expressadminarea/authenticateadmin'
    RoutesController.registerAuthenticateAdminRoutes(router)
  }

  private static registerBaseUrlRoutes(router: any): void {
    router.get(`${ RoutesController.expressAdminArea }/baseurl`, BaseUrlController.getDomainName)
  }

  private static registerAuthenticateAdminRoutes(router: any): void {
    router.post(
      `${ RoutesController.expressAdminArea }/authenticateadmin`,
      AuthenticateAdminService.authenticateAdmin,
      AuthenticateAdminController.getAdminJwt
    )
  }

}

export default RoutesController
