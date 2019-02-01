class ViewRegisterer {

  public static registerViews(ExpressAdminArea): void {
    const pathToViews = __dirname + '/../../views'
    const serveStaticFiles = ExpressAdminArea.express.static(pathToViews)
    ExpressAdminArea.router.use('/expressadminarea', serveStaticFiles)
    ExpressAdminArea.router.use('/expressadminarea/?*', serveStaticFiles)
  }
  
}

export default ViewRegisterer
