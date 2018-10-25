export const viewsEngineConfig = app => {
  app.engine('pug', require('pug').__express)
  app.set('views', __dirname + '/../../views')
  app.set('view engine', 'pug')
}