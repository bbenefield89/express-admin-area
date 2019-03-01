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
  
}

export default DBTablesService