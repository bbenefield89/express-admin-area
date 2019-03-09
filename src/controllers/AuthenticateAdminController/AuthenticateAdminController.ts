import * as bcrypt from 'bcrypt'

class AuthenticateAdminController {

  constructor() {}

  public static authAdmin(req, res): void {
    const { username, password } = req.body
    const Admin = res.locals.databaseConnection.models['admin']
    Admin.findOne({ where: { username } })
      .then(row => {
        if (row !== null) {
          bcrypt.compare(password, row.password, (err, match) => {
            if (err) {
              console.log('\n\n', err, '\n\n')
              res.send(err)
            }
            else if (match === true) {
              const { password, ...user } = row.dataValues
              res.send(user)
            }
            else {
              res.send('Wrong password')
            }
          })
        }
        else {
          res.send({ message: 'No Content', status: 204 })
        }
      })
  }
  
  public static getAdminJwt(_req, res): void {
    res.send({ data: res.locals.token })
  }
  
}

export default AuthenticateAdminController