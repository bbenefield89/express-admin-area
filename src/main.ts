import RoutesController from './controllers/RoutesController'
import * as routes from './routes'
import { Admin } from './models/Admin'

const adminAreaConfig = (express, db, models: Object) => {
  const adminArea = express.Router()
  const adminModel = Admin(db)

  /**
   * Model names need to be lowercase to easier grab the correct model in our
   * model-dependent routes. For an example look at the 'tableDataGet' route
   */
  const lowerCasedModels = { admins: adminModel }
  for (let modelName in models) {
    lowerCasedModels[ modelName.toLowerCase() ] = models[ modelName ]
  }

  // configure 'express-admin-area' middleware
  adminArea.use(express.json())
  adminArea.use((_req, res, next) => {
    res.locals.db = db
    res.locals.models = lowerCasedModels
    next()
  })
  adminArea.use((req, res, next) => {
    const http = req.protocol
    const domainName = req.get('host')
    res.locals.baseUrl = `${ http }://${ domainName }/expressadminarea`
    next()
  })
  adminArea.use('/expressadminarea', express.static(__dirname + '/views'))

  /**
   * ROUTES
   */
  // baseUrl
  RoutesController.registerAllRoutes(adminArea)
  
  // log in/authentication
  // routes.authRoutes(adminArea, db)

  // dashboard - this is where users will see a list of tables from the DB
  adminArea.get('/dashboard', routes.dashboardGet)
  adminArea.post('/dashboard', routes.dashboardPost)

  // tableData - view information about individual tables
  adminArea.get('/dashboard/:tableName', routes.tableDataGet)
  adminArea.post('/dashboard/:tableName', routes.tableDataPost)
  adminArea.delete('/dashboard/:tableName', routes.tableDataDelete)
  adminArea.put('/dashboard/:tableName', routes.tableDataPut)
  
  // create 'admin' table in database
  adminModel.sync()

  return adminArea
}

export { adminAreaConfig }
