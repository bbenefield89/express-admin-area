import DashboardService from '../../services/DBTablesService/DBTablesService'

class DashboardController {

  public static getTables(req, res): void {
    const dbTables: Array<string> = DashboardService.getTables(res.locals.databaseConnection)
    res.send(dbTables)
  }

  /**
   * TODO: Break this down into a service call on "DBTableService"
   */
  public static async getTableByName(req, res): Promise<void> {
    let dbTable: Object | Array<Object> = { message: 'No data found', status: 204 }
    for (let table of res.locals.databaseConnection.models) {
      const tableNameMatchesUrlParam = (table.name === req.params.table)
      if (tableNameMatchesUrlParam) {
        dbTable = await DashboardController.getTableRows(table.model)
      }
    }
    console.log('\n\n\n', dbTable, '\n\n\n')
    res.send(dbTable)
  }

  private static async getTableRows(dbModel): Promise<any> {
    let dbTableRows: Object | Array<Object> = null
    try {
      dbTableRows = await dbModel.findAll({ attributes: { exclude: ['password'] }})
    } catch (e) {
      dbTableRows = { message: 'Service Unavailable', status: 503 }
    }
    return dbTableRows
  }
  
}

export default DashboardController