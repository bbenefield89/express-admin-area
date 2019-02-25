class DashboardService {

  public static async getTablesQuery(databaseConnection): Promise<Array<string>> {
    const showTablesQuery: string = databaseConnection.queryInterface.QueryGenerator.showTablesQuery()
    const databaseTablesFromQuery: Array<Array<string>> = await databaseConnection.query(showTablesQuery)
    const formattedDatabaseTables: Array<string> = databaseTablesFromQuery.map(table => table[0])
    return formattedDatabaseTables
  }
  
}

export default DashboardService