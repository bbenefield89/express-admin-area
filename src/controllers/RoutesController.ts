import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
import AuthenticateAdminService from '../services/AuthenticateAdminService/AuthenticateAdminService'
import BaseUrlController from './BaseUrlController/BaseUrlController'
import DBTablesController from './DBTablesController/DBTablesController'

class RoutesController {

  private static expressAdminArea: string = '/expressadminarea'
  private static router;

  public static registerAllRoutes(router: any): void {
    this.setRouter(router)
    this.registerBaseUrlRoutes()
    this.registerAuthenticateAdminRoutes()
    this.registerDBTablesRoutes()
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

  private static registerDBTablesRoutes(): void {
    this.router.get(this.expressAdminArea + '/api/tables', DBTablesController.getTables)
    this.router.get(this.expressAdminArea + '/api/tables/:table', DBTablesController.getTableByName)
  }

  private static setRouter(router) {
    this.router = router
  }
  
}

export default RoutesController
