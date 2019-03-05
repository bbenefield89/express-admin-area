import { DataEncryptor } from '../../utilities/DataEncryptor/DataEncryptor'

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

  /**
   * TODO: Last worked on this method
   * @see  DBTablesController.createRow
   */
  public static async createRow(user: any, dbModel: any): Promise<any> {
    let newRow = {}
    try {
      user.password = await DataEncryptor.encrypt(user.password)
      newRow = await dbModel.create({ username: user.username, password: user.password })
    }
    catch (_e) {
      newRow = { message: 'Bad Request', status: 400 }
    }
    return newRow
  }
  
}

export default DBTablesService