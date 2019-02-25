class DashboardController {

  public static async getTables(req, res): Promise<void> {
    res.send(res.locals.dbTables)
  }
  
}

export default DashboardController