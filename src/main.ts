import { Router } from 'express';
import * as Sequelize from 'sequelize'

import { Admin } from './models/Admin'
import RoutesController from './controllers/RoutesController'
import MiddlewareRegisterer from './middlewares/MiddlewareRegisterer/MiddlewareRegisterer'
import ViewRegisterer from './middlewares/ViewRegisterer/ViewRegisterer'
import { ModelConfigurator } from './utilities/index'

class ExpressAdminArea {

  private static express;
  private static router: Router;
  private static databaseConnection;
  
  public static init(express: any, databaseUri: string, databaseTables: object[]): Router {
    this.express = express
    this.router = express.Router()
    this.databaseConnection = new Sequelize(databaseUri)
    this.databaseConnection.models = {
      admin: Admin(this.databaseConnection),
      ...ModelConfigurator.configureModels(databaseTables)
    }
    MiddlewareRegisterer.registerMiddlewares(this)
    RoutesController.registerAllRoutes(this.router)
    ViewRegisterer.registerViews(this)
    return this.router
  }

}

export { ExpressAdminArea }
