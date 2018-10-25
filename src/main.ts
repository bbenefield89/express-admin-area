const express = require('express')

import * as routes from './routes'
import * as mwc from './controllers/'
import { Admin } from './models/Admin'
import { viewsEngineConfig } from './helpers/viewsEngineConfig'

const adminAreaConfig = (app, db) => {
  const adminArea = express.Router()
  const adminModel = Admin(db)
  
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
  adminArea.post('/', mwc.authenticateUser(db), routes.authPost)

  // create 'admin' table in database
  adminModel.sync()

  return adminArea
}

export { adminAreaConfig }