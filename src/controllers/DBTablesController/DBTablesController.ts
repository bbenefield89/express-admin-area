import DBTablesService from '../../services/DBTablesService/DBTablesService'

class DBTablesController {

  public static getTables(req, res): void {
    const dbTables: Array<String> = DBTablesService.getTables(res.locals.databaseConnection.models)
    res.send(dbTables)
  }

  public static async getTableRows(req, res): Promise<void> {
    const tableName: string = req.params.table
    const model: Object = res.locals.databaseConnection.models[tableName]
    const rows: Object | Array<Object> = await DBTablesService.getTableRows(model)
    res.send(rows)
  }
  
}

export default DBTablesController