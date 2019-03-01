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
  
  public static async getTableRows(dbModel): Promise<any> {
    let dbTableRows: Object | Array<Object> = null
    try {
      dbTableRows = await dbModel.findAll({ attributes: { exclude: ['password'] }})
    } catch (e) {
      dbTableRows = { message: 'Service Unavailable', status: 503 }
    }
    return dbTableRows
  }
  
}

export default DBTablesService