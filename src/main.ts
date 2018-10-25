const express = require('express')

import * as routes from './routes'
import { Admin } from './models/Admin'
import { viewsEngineConfig } from './helpers/viewsEngineConfig'

const adminAreaConfig = (app, db) => {
  const adminArea = express.Router()
  
  // configure express to serve 'Pug' as default template engine
  viewsEngineConfig(app)
  
  // configure 'express-admin-area' middleware
  adminArea.use(express.json())
  adminArea.use((_req, res, next) => {
    res.locals.db = db
    next()
  })

  // routes
  adminArea.get('/', routes.authGet)
  adminArea.post('/', routes.authPost)

  // create 'admin' table in database
  Admin(db).sync()

  return adminArea
}

export { adminAreaConfig }