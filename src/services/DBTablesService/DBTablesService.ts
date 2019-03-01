class DBTablesService {

  // public static getTables(dbConnection: any): Array<string> {
  //   const tables: Array<Object> = dbConnection.models
  //   const tablesKeys: Array<string> = tables.map((table: any) => table.name)
  //   return tablesKeys
  // }

  public static getTables(dbModels) {
    const dbTables = Object.keys(dbModels)
    return dbTables
  }
  
  public static async getTableRows(model: any): Promise<Object | Array<Object>> {
    let columns: Object | Array<Object> = null
    try {
      columns = await model.findAll()
    }
    catch (error) {
      columns = { message: 'No Content', status: 204 }
    }
    return columns
  }

  public static async getTableRowByPk(reqParams: any, dbModel: any): Object {
    let row: Object = { message: 'No Content', status: 204 }
    try {
      const rowPk: number = reqParams.pk
      const model: any = dbModel
      row = await model.findByPk(rowPk) || row
    }
    catch (e) {
      row = { message: 'Bad Request', status: 400 }
    }
    return row
  }
  
}

export default DBTablesService