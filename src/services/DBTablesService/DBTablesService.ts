class DashboardService {

  public static getTables(req, res, next) {
    const { models } = res.locals.databaseConnection
    res.locals.dbTables = Object.keys(models)
    next()
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