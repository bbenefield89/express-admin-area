import DashboardService from '../../services/DBTablesService/DBTablesService'

class DashboardController {

  public static getTables(req, res): void {
    const dbTables: Array<string> = DashboardService.getTables(res.locals.databaseConnection)
    res.send(dbTables)
  }

  public static getTableByName(req, res): void {
    res.send(res.locals.dbTable)
  }
  
}

export default DashboardController