import BaseUrlController from './BaseUrlController/BaseUrlController'
import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'

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
    router.get(
      `${ RoutesController.expressAdminArea }/authenticateadmin`,
      AuthenticateAdminController.getAdminJwt
    )
  }

}

// export { authenticateUser } from './admin/authenticateUser';
export default RoutesController
