class DashboardService {

  public static getTables(dbConnection: any): Array<string> {
    const tables: Array<Object> = dbConnection.models
    const tablesKeys: Array<string> = tables.map((table: any) => table.name)
    return tablesKeys
  }

  public static getTableByName(req, res, next) {
    const { dbTables } = res.locals
    res.locals.dbTable = ''
    for (let table of dbTables) {
      const tableNameMatchesReqParams = (table.toLowerCase() === req.params.table.toLowerCase())
      if (tableNameMatchesReqParams) {
        res.locals.dbTable = table
        break
      }
    }
    next()
  }
  
}

export default DashboardService