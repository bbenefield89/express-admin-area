import { Admin } from '../../models/Admin'

/**
 * TODO: fix error handling/make error messages more generalized
 */
export const authenticateUser = db => {
  const adminModel = Admin(db)
  
  return (async (req, res, next) => {
    const { username, password } = req.body
    const admin = await adminModel.findOne({ where: { username }})

    if (admin) {
      if (password === admin.password) {
        // remove 'password' from the admin being returned
        const { password, ...authedAdmin } = admin.dataValues

        res.locals.admin = authedAdmin
      }
      else {
        res.locals.admin = { error: 'WRONG PASSWORD' }
      }
    }
    else {
      res.locals.admin = { error: 'USERNAME NOT FOUND' }
    }

    next()
  })
}