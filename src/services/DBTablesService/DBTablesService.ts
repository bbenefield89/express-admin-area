class DBTablesService {

  public static getTables(dbModels: object): string[] {
    let dbTables: string[] = []
    if (Object.prototype.toString.call(dbModels) === '[object Object]') {
      dbTables = Object.keys(dbModels)
    }
    return dbTables
  }

  public static async getTableRows(model: any): Promise<object | object[]> {
    let columns: object | object[] = null
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

  public static async createRow(reqBody: object, dbModel: any): Promise<any> {
    let newRow = {}
    try {
      newRow = await dbModel.create(reqBody)
    }
    catch (_e) {
      newRow = { message: 'Bad Request', status: 400 }
    }
    return newRow
  }

  public static async updateRow(reqBody: any, dbModel: any): Promise<any> {
    let updatedRow: any = { message: 'No Content', status: 204 }
    try {
      let rowFound: any = await dbModel.findByPk(reqBody.pk)
      rowFound = DBTablesService.updateRowFields(rowFound, reqBody)
      await rowFound.save()
    }
    catch (error) {
      console.log(error)
      updatedRow = { message: 'Bad Request', status: 400 }
    }
    return updatedRow
  }

  public static updateRowFields(row: any, reqBody: any): any {
    row = row
    for (let field in reqBody) {
      row[field] = reqBody[field]
    }
    return row
  }

  public static async deleteRow(reqBody: any, dbModel: any): Promise<any> {
    let response = { message: 'OK', status: 200 }
    try {
      await dbModel.destroy({ where: { id: reqBody.pk } })
    }
    catch (e) {
      response = { message: 'Bad Request', status: 400 }
    }
    return response
  }

}

export { DBTablesService }