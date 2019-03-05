class DBTablesService {

  public static getTables(dbModels) {
    const dbTables = Object.keys(dbModels)
    return dbTables
  }
  
  public static async getTableRows(model: any): Promise<Object | Array<Object>> {
    let columns: Object | Array<Object> = null
    try {
      columns = await model.findAll()
    }
    catch (_e) {
      columns = { message: 'No Content', status: 204 }
    }
    return columns
  }

  public static async getTableRowByPk(reqParams: any, dbModel: any): Promise<Object> {
    let row: Object = { message: 'No Content', status: 204 }
    try {
      const rowPk: number = reqParams.pk
      const model: any = dbModel
      row = await model.findByPk(rowPk) || row
    }
    catch (_e) {
      row = { message: 'Bad Request', status: 400 }
    }
    return row
  }
  
}

export default DBTablesService