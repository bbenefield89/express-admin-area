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
  private static config: Object;
  
  public static init(express: any, databaseUri: string, databaseTables: object, config: Object): Router {
    this.express = express
    this.router = express.Router()
    this.databaseConnection = new Sequelize(databaseUri)
    this.config = config
    this.attachTablesToDbConnection(databaseTables)
    MiddlewareRegisterer.registerMiddlewares(this)
    RoutesController.registerAllRoutes(this.router)
    ViewRegisterer.registerViews(this)
    return this.router
  }

  /**
   * TODO: Figure out what to do with these methods below
   *       They don't feel like they should be directly associated with the 'ExpressAdminArea' class
   * 
   * TODO: Should this method return an object of database tables to make accessing specific tables via the
   *       'req.params' object O(1) instead of an array of objects which is O(n)
   */
  private static attachTablesToDbConnection(dbTables: any): void {
    this.databaseConnection.models = { admin: Admin(this.databaseConnection) }
    for (let table in dbTables) {
      const lowerCasedTableName = table.toLowerCase()
      this.databaseConnection.models[lowerCasedTableName] = dbTables[table]
    }
  }

}

export { ExpressAdminArea }
