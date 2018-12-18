#!/usr/bin/env node

const createNewAdmin = require('./utils')

createNewAdmin()



// const Sequelize = require('sequelize')
// const prompt = require('prompt')

// const { Admin } = require('../build/src/models/Admin')

// /**
//  * @summary creates a new admin in the database
//  * @return {void}
//  */
// const createNewAdmin = async () => {
//   try {
//     const db = new Sequelize(process.argv[2], { operatorsAliases: false })
//     const admin = await Admin(db)
//     const adminInfo = await getAdminInfo()
//     const { username } = await admin.create(adminInfo)
  
//     console.log(`New admin ${ username } successfully created.`)
//   }
//   catch(err) {
//     throw new Error(err)
//   }
  
//   process.exit()
// }
// createNewAdmin()

// /**
//  * @summary using the prompt library from NPM, this function asks the user for
//  *          a username and password to later create a new admin in the database
//  * @return {Promise}
//  */
// async function getAdminInfo() {
//   return new Promise((res, rej) => {
//     prompt.start()
  
//     prompt.get(['username', 'password'], (err, response) => {
//       if (err) {
//         rej(err)
//       }
  
//       res(response)
//     })
//   })
// }

// const createNewAdmin = require('./utils')

// createNewAdmin()