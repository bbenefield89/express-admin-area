import AuthenticateAdminController from './AuthenticateAdminController/AuthenticateAdminController'
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
    this.router.post(this.expressAdminArea + '/api/auth', AuthenticateAdminController.authAdmin)
    this.router.post(this.expressAdminArea + '/api/verify', AuthenticateAdminController.verifyToken)
  }

  private static registerDBTablesRoutes(): void {
    this.router.get(this.expressAdminArea + '/api/tables', DBTablesController.getTables)
    this.router.get(this.expressAdminArea + '/api/tables/:table', DBTablesController.getTableRows)
    this.router.get(this.expressAdminArea + '/api/tables/:table/describe', DBTablesController.getTableFieldNames)
    this.router.get(this.expressAdminArea + '/api/tables/:table/:pk', DBTablesController.getTableRowByPk)
    this.router.post(this.expressAdminArea + '/api/tables/:table', DBTablesController.createRow)
    this.router.patch(this.expressAdminArea + '/api/tables/:table/:pk', DBTablesController.updateRow)
    this.router.delete(this.expressAdminArea + '/api/tables/:table/:pk', DBTablesController.deleteRow)
  }

  private static setRouter(router) {
    this.router = router
  }
  
}

export default RoutesController
