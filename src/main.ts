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
    this.databaseConnection.models = { Admin: Admin(this.databaseConnection), ...databaseTables }
    MiddlewareRegisterer.registerMiddlewares(this)
    RoutesController.registerAllRoutes(this.router)
    ViewRegisterer.registerViews(this)
    return this.router
  }

}

export { ExpressAdminArea }
