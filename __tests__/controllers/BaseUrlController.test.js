const request = require('supertest')
const express = require('express')

const ExpressAdminArea = require('../../index')

const app = express()
const expressAdminArea = ExpressAdminArea.init(express)

app.use(express.json())
app.use(expressAdminArea)


describe('/expressadminarea/baseurl', () => {
  it('should return "http://localhost:3000/expressadminarea/baseurl', () => {
    request(app).get('/expressadminarea')
      .set('Accept', 'application/json')
      .expect('Content-Type', "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
      })
  })
})