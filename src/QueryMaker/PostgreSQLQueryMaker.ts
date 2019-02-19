class PostgreSQLQueryMaker {

  public static showDatabaseTables(databaseConnection): void {
    databaseConnection.query('SELECT tablename FROM pg_catalog.pg_tables where schemaname = \'public\'')
      .then(data => {
        const databaseTables = data[0]
        databaseTables.forEach(table => console.log(table.tablename))
      })
  }
  
}

export default PostgreSQLQueryMaker