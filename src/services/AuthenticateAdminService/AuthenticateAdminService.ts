import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import Admin from '../../models/Admin'

class AuthenticateAdminService {

  constructor() {}

  public static authenticateAdmin(req, res, next): void {
    const { databaseConnection } = res.locals
    const adminModel = Admin(databaseConnection)
    
    adminModel.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(record => {
        bcrypt.compare(req.body.password, record.password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              jwt.sign({
                  id: record.id,
                  username: record.username
                },
                'expressadminarea',
                (_err, token) => {
                  res.locals.token = token
                  next()
              })
            }
          })
      })
      .catch(err => {
        console.log(err)
        console.log('\n\nError: AuthenticateAdminService.ts (authenticateAdmin)\n\n')
        next()
      })
  }
  
}

export default AuthenticateAdminService