class MiddlewareRegisterer {

  private static ExpressAdminArea;

  public static registerMiddlewares(ExpressAdminArea): void {
    this.setExpressAdminArea(ExpressAdminArea)
    this.registerContentTypes()
    this.registerGlobalVariables()
  }

  private static registerContentTypes(): void {
    this.ExpressAdminArea.router.use(this.ExpressAdminArea.express.json())
  }
  
  private static registerGlobalVariables(): void {
    this.ExpressAdminArea.router.use((req, res, next) => {
      const http = req.protocol
      const domainName = req.get('host')
      res.locals.baseUrl = `${ http }://${ domainName }/expressadminarea`
      res.locals.databaseConnection  = this.ExpressAdminArea.databaseConnection
      next()
    })
  }

  private static setExpressAdminArea(ExpressAdminArea): void {
    this.ExpressAdminArea = ExpressAdminArea
  }
  
}

export default MiddlewareRegisterer
