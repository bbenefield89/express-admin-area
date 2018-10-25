const adminAreaConfig = (express, app, _db) => {
  const adminArea = express.Router()
  
  // configure express to serve Handlebars as default template engine
  app.engine('pug', require('pug').__express)
  app.set('views', __dirname + '/../../views')
  app.set('view engine', 'pug')
  
  // index/auth route
  /**
   * TODO: change this route to the signup/login route
   */
  adminArea.get('/', (_req, res) => {
    const pugVars = {
      message: 'ADMIN AREA',
      pageTitle: 'Overview'
    }
    
    res.render('index', pugVars)
  })

  return adminArea
}

export { adminAreaConfig }