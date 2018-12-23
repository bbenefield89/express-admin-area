const bcrypt = require('bcrypt')

import { Admin } from '../../models/Admin'

/**
 * TODO: fix error handling/make error messages more generalized
 */
export const authenticateUser = db => {
  const adminModel = Admin(db)
  
  return (async (req, res, next) => {
    const { username, password } = req.body
    const admin = await adminModel.findOne({ where: { username }})
    res.locals.admin = { error: 'Either the username or password is incorrect.' }

    if (admin) {
      await compareProvidedAndSavedAdminPasswords(password, admin, res)
    }

    next()
  })
}

function compareProvidedAndSavedAdminPasswords(plainTextPw, adminInfo, res) {
  return bcrypt.compare(plainTextPw, adminInfo.password)
    .then(passwordsAreSame => {
      if (passwordsAreSame) {
        saveAdminToLocals(adminInfo, res)
      }
    })
    .catch(err => {
      throw new Error(err)
    })
}

function saveAdminToLocals(adminInfo, res) {
  const { password, ...admin } = adminInfo.dataValues
  res.locals.admin = admin
}