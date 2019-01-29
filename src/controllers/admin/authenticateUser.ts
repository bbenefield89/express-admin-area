const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

import Admin from '../../models/Admin'

export const authenticateUser = db => {
  const adminModel = Admin(db)
  
  return (async (req, res, next) => {
    const { username, password } = req.body
    const admin = await adminModel.findOne({ where: { username }})
    res.locals.token = { error: 'Either the username or password is incorrect.' }

    if (admin) {
      await compareProvidedAndSavedAdminPasswords(password, admin, res)
    }

    next()
  })
}

function compareProvidedAndSavedAdminPasswords(plainTextPw, adminInfo, res) {
  return bcrypt.compare(plainTextPw, adminInfo.password)
    .then(async (passwordsAreSame) => {
      if (passwordsAreSame) {
        const { password, ...admin } = adminInfo.dataValues
        res.locals.token =  await createJwtFromAdmin(admin)
      }
    })
    .catch(err => {
      throw new Error(err)
    })
}

function createJwtFromAdmin(adminInfo) {
  return new Promise((res, _rej) => {
    const options = {
      expiresIn: '1d'
    }

    jwt.sign(adminInfo, 'shhh', options, (err, response) => {
      if (err) {
        throw new Error(err)
      }

      res(response)
    })
  })
}
