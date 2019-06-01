import { DBTablesService } from '../../services/DBTablesService/DBTablesService'

class DBTablesController {

  public static getTables(_req, res): void {
    const dbTables: Array<String> = DBTablesService.getTables(res.locals.databaseConnection.models)
    res.send(dbTables)
  }

  public static async getTableRows(req, res): Promise<void> {
    const tableName: string = req.params.table
    const model: object = res.locals.databaseConnection.models[tableName]
    const modelFieldNames: string[] = DBTablesService.getTablesFieldNames(model)
    const rows: object | object[] = await DBTablesService.getTableRows(model)
    res.send({ modelFieldNames, rows })
  }

  public static async getTableRowByPk(req, res): Promise<void> {
    const params: any | Object = req.params
    const dbModel: Object = res.locals.databaseConnection.models[params.table]
    let row: Object = await DBTablesService.getTableRowByPk(params, dbModel)
    res.send(row)
  }

  public static async createRow(req, res): Promise<void> {
    const table: any = req.params.table
    const dbModel: any = res.locals.databaseConnection.models[table]
    const newRow = await DBTablesService.createRow(req.body, dbModel)
    res.send(newRow)
  }

  public static async updateRow(req, res): Promise<void> {
    const reqBody: any = req.body
    const pk: any = req.params.pk
    const table: any = req.params.table
    const dbModel: any = res.locals.databaseConnection.models[table]
    reqBody.pk = pk
    const response = await DBTablesService.updateRow(reqBody, dbModel)
    res.send(response)
  }

  public static async deleteRow(req, res): Promise<void> {
    const pk: any = { pk: req.params.pk }
    const table: any = req.params.table
    const dbModel: any = res.locals.databaseConnection.models[table]
    const response: any = await DBTablesService.deleteRow(pk, dbModel)
    res.status(response.status).send(response)
  }

  public static async getTableFieldNames(req, res): Promise<void> {
    const table: any = req.params.table
    const dbModel: any = res.locals.databaseConnection.models[table]
    const tableFieldNames: any = await dbModel.describe()
    res.status(200).send(tableFieldNames)
  }
  
  // This seems like it's going to be very difficult. I'm going to hold off on this until later
  public static createTable() { }

}

export default DBTablesController