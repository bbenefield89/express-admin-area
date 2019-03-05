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

  // This seems like it's going to be very difficult. I'm going to hold off on this until later
  public static createTable() {}

  // Rewrite this into a service
  public static createRow(req, res): any {
    const table: any = req.params.table
    const dbModel: any = res.locals.databaseConnection.models[table]
    dbModel.create({ username: req.body.username, password: req.body.password })
      .then(response => {
        console.log('\n\n\n', response, '\n\n\n')
        res.send({ user: req.body })
      })
      .catch(err => {
        console.log('\n\n\n', err, '\n\n\n')
        res.send({ error: 'error' })
      })
  }
  
}

export default DBTablesController