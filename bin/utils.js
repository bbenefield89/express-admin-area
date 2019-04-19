const bcrypt = require('bcrypt')
const process = require('process')
const prompt = require('prompt')
const Sequelize = require('sequelize')

const { Admin } = require('../build/src/models/Admin')

/**
 * @summary creates a new admin in the database
 * @return {void}
 */
async function createNewAdmin() {
  try {
    await tryToCreateNewAdmin()
    exitApplication()
  }
  catch (err) {
    throw new Error(err)
  }
}

/**
 * @summary gets all required information needed to create a new SuperUser in
 *          the database
 * @return {void}
 */
async function tryToCreateNewAdmin() {
  const databaseUrl = process.argv[2]
  const databaseConfig = { operatorsAliases: false }
  const database = new Sequelize(databaseUrl, databaseConfig)
  const adminModel = await Admin(database)
  const adminInfo = await getAdminInfo()
  await createTableIfNotExist(adminModel)
  const { username } = await adminModel.create(adminInfo)
  logToConsoleAdminWasSuccessfullyCreated(username)
}

/**
 * @summary using the prompt library from NPM, this function asks the user for
 *          a username and password to later create a new admin in the database
 * @return {Object}
 */
async function getAdminInfo() {
  prompt.start()
  let superUserCredentials = await askUserForSuperUserCredentials()
  superUserCredentials.password = await hashSuperUsersPassword(superUserCredentials.password)
  return superUserCredentials
}

/**
 * @summary asks user for the SuperUsers username and password (credentials)
 * @return {Promise}
 */
async function askUserForSuperUserCredentials() {
  return new Promise((res, rej) => {
    prompt.get(['username', 'password'], (err, response) => {
      if (err) {
        rej(err)
      }
  
      res(response)
    })
  })
}

/**
 * @summary takes a plain text password and applies a salt/hash to it using the
 *          bcrypt library
 * @return {Promise}
 */
function hashSuperUsersPassword(superUserPassword) {
  return new Promise((res, rej) => {
    bcrypt.hash(superUserPassword, 10, (err, hashedPassword) => {
      if (err) {
        rej(err)
      }
  
      res(hashedPassword)
    })
  })
}

/**
 * @summary force exits the CLI tool application
 * @return {void}
 */
function exitApplication() {
  process.exit()
}

/**
 * @summary creates the Admin table in the DB if it does not exist
 * @return void
 */
async function createTableIfNotExist(model) {
  await model.sync()
}

/**
 * @summary on successfully creating a new SuperUser this function logs out a
 *          notification to the console letting the user know everything worked
 * @return {void}
 */
function logToConsoleAdminWasSuccessfullyCreated(adminUsername) {
  console.log(`New admin, "${adminUsername}", was successfully created.`)
}

module.exports = createNewAdmin