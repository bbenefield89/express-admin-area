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
  return await askUserForSuperUserCredentials()
}

/**
 * @summary asks user for the SuperUsers username and password (credentials)
 * @return {Promise}
 */
function askUserForSuperUserCredentials() {
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
 * @summary force exits the CLI tool application
 * @return {void}
 */
function exitApplication() {
  process.exit()
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