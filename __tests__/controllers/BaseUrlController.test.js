const request = require('supertest')
const express = require('express')

const ExpressAdminArea = require('../../index')

const app = express()
const expressAdminArea = ExpressAdminArea.init(express, 'postgresql://postgres:root@127.0.0.1/express_admin_area', {})

app.use(express.json())
app.use(expressAdminArea)


describe('/expressadminarea/baseurl', () => {
  it('should return "http://localhost:3000/expressadminarea/baseurl"', done => {
    request(app).get('/expressadminarea/baseurl')
      .expect(res => {
        res.body.data = 'http://localhost:3000/expressadminarea/baseurl'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect({ data: 'http://localhost:3000/expressadminarea/baseurl' })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })
})