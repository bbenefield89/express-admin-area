# Express Admin Area

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/bbenefield89/express-admin-area/pulls)
![Version 0.2.1](https://img.shields.io/badge/Version-0.2.1-brightgreen.svg?style=flat-square)

## The problem
While developers tend to live in the command line that doesn't mean everyone on the team likes to. Whether this is a non-technical member of the team or even another fellow developer.


## This solution
Express Admin Area is a GUI in the browser for Database Administration tasks, Database Administration Interface (DBAI), that lets you and your team manage your database right from the browser.

## Table of Contents

- [Usage](#usage)
- [Inspiration](#inspiration)
- [Contributors](#contributors)
- [LICENSE](#license)

## Usage
Express Admin Area is extremely simple to use. All you need to do is
- Install it as a dependency: `yarn add express-admin-area` or `npm install express-admin area`

- [Create a super user from the command line](https://asciinema.org/a/Dp11oZs8K0vf6Xqg2J1ord2zi): `yarn run express-admin-area <<full database url>>` or `npm run express-admin-area <<full database url>>`.

- Require Express Admin Area in your project and pass it a reference to your server, database using Sequelize, and an object containing the models in your database.

**connection.js**
```javascript
/**
 * This is our connection.js file that will handle the connection of our server
 * layer to the database layer. Using Sequelize this is not only easily achieved
 * but we can rest assured that our queries are also safe
 */
const Sequelize = require('sequelize')

const db = new Sequelize('postgresql://<<username>>:<<password>>@127.0.0.1:5432/express_admin_area')

module.exports = db
```

**Electronics.js**
```javascript
/**
 * Now that our server and database are connected we need to create some models
 */
const Sequelize = require('sequelize')

const db = require('../connection')

const Electronics = db.define(
  'electronics',
  {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER
  }
)

module.exports = Electronics
```

**app.js**
```javascript
/**
 * Lastly, after connecting our database and creating our Electronics model to store
 * information about all of our electronics, we now need to pass this information
 * to Express Admin Area through the adminAreaConfig method from Express Admin Area
 */
// our projects dependencies: express, express-admin-area
const express = require('express')
const { adminAreaConfig } = require('express-admin-area')

// this is our database reference from connection.js
const db = require('./database/connection')
// this is our Electronics model from Electronics.js
const Electronics = require('./database/models/Electronics')

const app = express()
const adminArea = adminAreaConfig(
  app,           // pass Express Admin Area a reference of the app variable
  db,            // pass in the database
  {
    Electronics  // pass in all database models
  }
)

/**
 * Tell Express you want to use the admin interface from Express Admin Area
 */
app.use('/admin', adminArea)

Electronics.sync()

app.listen(3000, () => console.log('\n\nServer Online\n\n'))

```

Viola, now visit `/admin` in the browser, log in, and you should be ready to manage your database from the browser.

## Inspiration
Django's admin interface

## Contributors
| [<img src="https://avatars0.githubusercontent.com/u/29239201?v=4" align="center" width=100><br><b>Brandon Benefield</b> ](https://github.com/bbenefield89) |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|

## LICENSE
MIT