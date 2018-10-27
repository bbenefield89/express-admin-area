#! /usr/bin/env node

/**
 * TODO: use a promise library, bluebird or node built in util.promisify to
 *       help refactor this mess
 */
const fs = require('fs')
const cp = require('child_process')
const Sequelize = require('sequelize')
const prompt = require('prompt')

const { Admin } = require('../build/src/models/Admin')

let dbDialect = ''

/**
 * @summary reads the argument passed into the command prompt and decides
 *          which database dialect to use with Sequelize,
 *          e.g. postgres: pg, sqlite: sqlite3
 * @return {string}
 */
const setDBDialect = () => {
  /**
   * TODO: right now this will only work for PostgreSQL DB's
   *       need to figure out what 'sqlite', 'mysql', and 'mssql' DB urls look
   *       like
   *       and handle these conditions accordingly
   */
  const dbConnUrl = process.argv[2]

  if (dbConnUrl.includes('postgresql')) {
    dbDialect = 'pg pg-hstore'
  }

  return dbDialect
}

setDBDialect()

/**
 * @summary looks through the root directory for either a package-lock.json or
 *          a yarn.lock file to determine which package manager to use to
 *          download the database dialect from NPM
 * @return {Promise}
 */
const setPackageManager = () => new Promise((res, rej) => {
  let packageManager = ''

  fs.readdir('./', (err, data) => {
    if (err)
      throw new Error(err)
  
    if (/package-lock.json/.test(data)) {
      packageManager = 'npm'
    }
    else if (/yarn.lock/.test(data)) {
      packageManager = 'yarn'
    }
    else {
      rej('No package manager found')
    }

    res(packageManager)
  })
})

/**
 * @summary using the prompt library from NPM, this function asks the user for
 *          a username and password to later create a new admin in the database
 * @return {Promise}
 */
const getAdminInfo = async () => {
  return new Promise((res, rej) => {
    prompt.start()
  
    prompt.get(['username', 'password'], (err, response) => {
      if (err) {
        throw new Error(err)
      }
  
      res(response)
    })
  })
}

/**
 * @summary creates a new admin in the database
 * @return {void}
 */
const fetchAdmins = async () => {
  const db = new Sequelize(process.argv[2])
  const admin = await Admin(db)
  const adminInfo = await getAdminInfo()
  const { username } = await admin.create(adminInfo)

  console.log(`New admin ${ username } successfully created.`)
  process.exit()
}

/**
 * @summary installs the correct database dialect
 * @return {void}
 */
const installDependencies = async () => {
  try {
    const packageManager = await setPackageManager()
    const installDepsCommand = packageManager === 'npm' ? 'npm install' : 'yarn'
    
    console.log(`Installing Dependencies: ${ dbDialect }`)

    cp.exec(`${ installDepsCommand } ${ dbDialect }`, (err, sout, serr) => {
      if (err) {
        throw new Error(err)
      }
    
      if (serr) {
        console.log('STDERR:', serr)
      }
    
      if (sout) {
        console.log('STDOUT:', sout)
        fetchAdmins()
      }
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

installDependencies()