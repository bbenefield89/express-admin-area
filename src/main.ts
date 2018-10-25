const express = require('express')

import * as routes from './routes'
import { Admin } from './models/Admin'

const adminAreaConfig = (app, db) => {
  const adminArea = express.Router()
  
  // configure express to serve Handlebars as default template engine
  app.engine('pug', require('pug').__express)
  app.set('views', __dirname + '/../../views')
  app.set('view engine', 'pug')
  
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