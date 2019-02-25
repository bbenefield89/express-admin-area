class DashboardController {

  public static getTables(req, res): void {
    res.send(res.locals.dbTables)
  }

  public static getTableByName(req, res): void {
    res.send(res.locals.dbTable)
  }
  
}

export default DashboardController