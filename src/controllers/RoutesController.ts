import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
import AuthenticateAdminService from '../services/AuthenticateAdminService/AuthenticateAdminService'
import BaseUrlController from './BaseUrlController/BaseUrlController'
import DashboardController from './DashboardController/DashboardController'

class RoutesController {

  private static expressAdminArea: string = '/expressadminarea'
  private static router;

  public static registerAllRoutes(router: any): void {
    this.setRouter(router)
    // GET: 'expressadminarea/baseurl'
    this.registerBaseUrlRoutes()
    // GET: 'expressadminarea/authenticateadmin'
    this.registerAuthenticateAdminRoutes()
    // GET: '/expressadminarea/dashboard'
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
    this.router.get(this.expressAdminArea + '/api/dashboard', DashboardController.getDashboard)
  }

  private static setRouter(router) {
    this.router = router
  }
  
}

export default RoutesController
