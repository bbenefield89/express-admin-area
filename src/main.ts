import * as Sequelize from 'sequelize'

import RoutesController from './controllers/RoutesController'
import MiddlewareRegisterer from './middlewares/MiddlewareRegisterer/MiddlewareRegisterer'
import ViewRegisterer from './middlewares/ViewRegisterer/ViewRegisterer'

class ExpressAdminArea {

  private static express;
  private static router;
  private static databaseConnection;
  private static databaseTables;
  
  public static init(express, databaseUri: string, databaseTables: object) {
    this.express = express
    this.router = express.Router()
    this.databaseConnection = new Sequelize(databaseUri)
    this.databaseTables = databaseTables
    MiddlewareRegisterer.registerMiddlewares(this)
    RoutesController.registerAllRoutes(this.router)
    ViewRegisterer.registerViews(this)
    return this.router
  }

}

export { ExpressAdminArea }
