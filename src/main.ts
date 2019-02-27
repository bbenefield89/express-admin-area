import { Router } from 'express';
import * as Sequelize from 'sequelize'

import { Admin } from './models/Admin'
import RoutesController from './controllers/RoutesController'
import MiddlewareRegisterer from './middlewares/MiddlewareRegisterer/MiddlewareRegisterer'
import ViewRegisterer from './middlewares/ViewRegisterer/ViewRegisterer'

class ExpressAdminArea {

  private static express;
  private static router: Router;
  private static databaseConnection;
  
  public static init(express: any, databaseUri: string, databaseTables: object): Router {
    this.express = express
    this.router = express.Router()
    this.databaseConnection = new Sequelize(databaseUri)
    this.attachTablesToDbConnection(databaseTables)
    MiddlewareRegisterer.registerMiddlewares(this)
    RoutesController.registerAllRoutes(this.router)
    ViewRegisterer.registerViews(this)
    return this.router
  }

  /**
   * TODO: Figure out what to do with these methods below
   *       They don't feel like they should be directly associated with the 'ExpressAdminArea' class
   */
  private static attachTablesToDbConnection(dbTables: any): void {
    this.databaseConnection.models = [{ name: 'admin', model: Admin(this.databaseConnection) }]
    const dbTableNames: Array<String> = Object.keys(dbTables)
    let i: number = 0
    for (let table in dbTables) {
      this.databaseConnection.models.push({
        name: this.dbTableNameLowerCased(dbTableNames[i]),
        model: dbTables[table]
      })
      i++
    }
  }

  private static dbTableNameLowerCased(dbTableName: String): String {
    return dbTableName.toLowerCase()
  }
  
}

export { ExpressAdminArea }
