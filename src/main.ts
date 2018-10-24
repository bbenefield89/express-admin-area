const adminArea = require('express').Router()

const index =  __dirname + '/views/index.html'

adminArea.get('/', (_req, res) => {
  res.sendFile(index)
})

export { adminArea }