import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
import AuthenticateAdminService from '../services/AuthenticateAdminService/AuthenticateAdminService'
import BaseUrlController from './BaseUrlController/BaseUrlController'
import DashboardController from './DashboardController/DashboardController'
import DashboardService from '../services/DashboardService/DashboardService'

class RoutesController {

  private static expressAdminArea: string = '/expressadminarea'
  private static router;

  public static registerAllRoutes(router: any): void {
    this.setRouter(router)
    this.registerBaseUrlRoutes()
    this.registerAuthenticateAdminRoutes()
    this.registerDashboardRoutes()
  }

  private static registerBaseUrlRoutes(): void {
    this.router.get(`${ this.expressAdminArea }/api/baseurl`, BaseUrlController.getDomainName)
  }

  private static registerAuthenticateAdminRoutes(): void {
    this.router.post(`${ this.expressAdminArea }/api/authenticateadmin`,
      AuthenticateAdminService.authenticateAdmin,
      AuthenticateAdminController.getAdminJwt
    )
  }

  private static registerDashboardRoutes(): void {
    this.router.get(
      this.expressAdminArea + '/api/dashboard',
      DashboardService.getTables,
      DashboardController.getTables
    )
  }

  private static setRouter(router) {
    this.router = router
  }
  
}

export default RoutesController
