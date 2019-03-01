import DBTablesService from '../../services/DBTablesService/DBTablesService'

class DashboardController {

  public static getTables(req, res): void {
    const dbTables: Array<String> = DBTablesService.getTables(res.locals.databaseConnection.models)
    res.send(dbTables)
  }

  public static async getTableByName(req, res): Promise<void> {
    const tableName: string = req.params.table
    const model: Object = res.locals.databaseConnection.models[tableName]
    const columns: Object | Array<Object> = await DashboardController.foo(model)
    res.send(columns)
  }

  // TODO: Move this method into 'DBTableService'
  public static async foo(model: any): Promise<Object | Array<Object>> {
    let columns: Object | Array<Object> = null
    try {
      columns = await model.findAll()
    }
    catch (error) {
      columns = { message: 'No Content', status: 204 }
    }
    return columns
  }
  
}

export default DashboardController