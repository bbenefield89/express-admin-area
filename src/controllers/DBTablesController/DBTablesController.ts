import DashboardService from '../../services/DBTablesService/DBTablesService'

class DashboardController {

  public static getTables(req, res): void {
    const dbTables: Array<string> = DashboardService.getTables(res.locals.databaseConnection)
    res.send(dbTables)
  }

  public static async getTableByName(req, res): Promise<void> {
    let dbTable: Object | Array<Object> = { message: 'No data found', status: 204 }
    for (let table of res.locals.databaseConnection.models) {
      const tableNameMatchesUrlParam = (table.name === req.params.table)
      if (tableNameMatchesUrlParam) {
        dbTable = await DashboardService.getTableRows(table.model)
      }
    }
    res.send(dbTable)
  }

}

export default DashboardController