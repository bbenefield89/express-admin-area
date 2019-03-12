import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

class AuthenticateAdminController {

  constructor() { }

  public static async authAdmin(req, res): Promise<void> {
    const { username, password } = req.body
    const AdminModel = res.locals.databaseConnection.models['admin']
    const adminRow: any | null = await AdminModel.findOne({ where: { username } })
    if (adminRow !== null) {
      const isPasswordsMatch = await Promise.resolve(bcrypt.compare(password, adminRow.password))
      if (isPasswordsMatch) {
        const { password, ...admin } = adminRow.dataValues
        const token: string = await Promise.resolve(jwt.sign({ admin }, 'expressadminarea'))
        res.send({ token })
      }
      else {
        res.send({})
      }
    }
    else {
      res.status(204).send({})
    }
  }

  private static foo(plainPassword: string, adminRow: any) {
    return Promise.resolve(bcrypt.compare(plainPassword, adminRow.password))

    //   bcrypt.compare(plainPassword, adminRow.password, (err, match) => {
    //     if (err) {
    //       console.log('\n\n', err, '\n\n')
    //       res.send(err)
    //     }
    //     else if (match === true) {
    //       const { password, ...user } = adminRow.dataValues
    //       jwt.sign({ user }, 'expressadminarea', (err, token) => {
    //         if (err) {
    //           console.log('\n\n', err, '\n\n')
    //           res.status(500).send(err)
    //         }
    //         else {
    //           res.status(200).send({ token })
    //         }
    //       })
    //     }
    //     else {
    //       res.status(401).send({})
    //     }
    //   })
    // }
  }

  public static getAdminJwt(_req, res): void {
    res.send({ data: res.locals.token })
  }

}

export default AuthenticateAdminController