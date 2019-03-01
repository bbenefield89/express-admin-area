import DBTablesService from '../../services/DBTablesService/DBTablesService'

class DBTablesController {

  public static getTables(_req, res): void {
    const dbTables: Array<String> = DBTablesService.getTables(res.locals.databaseConnection.models)
    res.send(dbTables)
  }

  public static async getTableRows(req, res): Promise<void> {
    const tableName: string = req.params.table
    const model: Object = res.locals.databaseConnection.models[tableName]
    const rows: Object | Array<Object> = await DBTablesService.getTableRows(model)
    res.send(rows)
  }

  public static async getTableRowByPk(req, res): Promise<void> {
    const params: any | Object = req.params
    const dbModel: Object = res.locals.databaseConnection.models[params.table]
    let row: Object = await DBTablesService.getTableRowByPk(params, dbModel)
    res.send(row)
  }
  
}

export default DBTablesController