interface QueryMakerFactory {
  databaseConnection: any
}

class QueryMakerFactory implements QueryMakerFactory {

  constructor(databaseConnection) {
    this.databaseConnection = databaseConnection
  }
  
}

export default QueryMakerFactory