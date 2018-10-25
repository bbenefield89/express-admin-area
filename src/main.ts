import * as routes from './routes'

const adminAreaConfig = (express, app, db) => {
  const adminArea = express.Router()
  
  // configure express to serve Handlebars as default template engine
  app.engine('pug', require('pug').__express)
  app.set('views', __dirname + '/../../views')
  app.set('view engine', 'pug')
  
  adminArea.use((_req, res, next) => {
    res.locals.db = db
    next()
  })
  
  adminArea.get('/', routes.auth)

  return adminArea
}

export { adminAreaConfig }