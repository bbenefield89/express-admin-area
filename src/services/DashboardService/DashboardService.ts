class DashboardService {

  public static async getTables(req, res, next) {
    const { models } = res.locals.databaseConnection
    res.locals.dbTables = Object.keys(models)
    next()
  }
  
}

export default DashboardService