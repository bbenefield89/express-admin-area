# Express Admin Area

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)][prs_welcome]
![Version 0.6.2][package_version]

## The problem
While developers tend to live in the command line that doesn't mean everyone on the team likes to. Whether this is a non-technical member of the team or even another fellow developer.


## This solution
Express Admin Area is a GUI in the browser for Database Administration tasks, Database Administration Interface (DBAI), that lets you and your team manage your database right from the browser.

[Feel free to checkout this example repo that has the minimum requirements to use this package.][express_admin_area_example]

## Table of Contents

- [Usage](#usage)
- [Inspiration](#inspiration)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [LICENSE](#license)

## Usage
Express Admin Area is extremely simple to use. All you need to do is
- Install it as a dependency: `yarn add express-admin-area` or `npm install express-admin area`

- [Create a super user from the command line][create_super_user]: `yarn run express-admin-area <<full database url>>` or `npm run express-admin-area <<full database url>>`.

- Require Express Admin Area in your project and pass it a reference to your server, database using Sequelize, and an object containing the models in your database.

**connection.js**
```javascript
/**
 * This is our connection.js file that will handle the connection of our server
 * layer to the database layer. Using Sequelize this is not only easily achieved
 * but we can rest assured that our queries are also safe
 */
// require our .env variables
require('dotenv').config()

const Sequelize = require('sequelize')

// create a connection to our DB
const db = new Sequelize(process.env.DB_URL, { operatorAliases: false })

module.exports = db
```

**Electronics.js**
```javascript
/**
 * Now that our server and database are connected we need to create some models
 */
const Sequelize = require('sequelize')

const db = require('../connection')

// define our Electronics table
const Electronics = db.define(
  'electronics',  // name of our table in the DB
  {
    name: Sequelize.STRING,  // name field with a type of string
    price: Sequelize.INTEGER  // price field with a type of integer
  }
)

module.exports = Electronics
```

**app.js**
```javascript
/**
 * Lastly, after connecting our database and creating our Electronics model to store
 * information about all of our electronics, we now need to pass this information
 * to ExpressAdminArea through the "init" method from ExpressAdminArea
 */
// require our .env variables
require('dotenv').config()

// our projects dependencies: express, express-admin-area
const express = require('express')
const ExpressAdminArea = require('express-admin-area')

const db = require('./database/connection')
// be sure to require your Sequelize models
const Electronics = require('./database/models/Electronics')

const app = express()

/**
 * Call the 'init' method from ExpressAdminArea passing in: express, databaseURI,
 * and an object containing all of your apps Sequelize models that you would like
 * to interact with using ExpressAdminArea
 */
const expressAdminArea = ExpressAdminArea.init(
  express,  // pass a reference to your apps instance of express
  process.env.DB_URL,  // databaseURI to your apps database
  [{ model: Electronics }]  // array of objects containing your apps Sequelize models
)

/**
 * Tell your app you would like to "use" ExpressAdminArea as a middleware
 * This will automatically create a new route at "https://myapp.com/expressadminarea"
 * where you can sign-in and begin interacting with your database from the browser
 */
app.use(expressAdminArea)

// tell your app to create your "electronics" table in the database if it does not exist
Electronics.sync()

// give your app an open port to start accepting requests from
app.listen(3000, () => console.log('\n\nServer Online\n\n'))
```

Viola! Now visit `https://myapp.com/expressadminarea` in your browser. Log in with your superuser credentials and you should be ready to manage your database from the browser.

## Inspiration
Django's admin interface

## Contributing
A good explanaiton of how to contribute to Express Admin Area can be found in the [Contributing.md][contributingmd] file.

## Contributors
| [<img src="https://avatars0.githubusercontent.com/u/29239201?v=4" align="center" width=100><br><b>Brandon Benefield</b> ](https://github.com/bbenefield89) |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|

## LICENSE
MIT

[contributingmd]: https://github.com/bbenefield89/express-admin-area/blob/master/.github/ISSUE_TEMPLATE.md

[express_admin_area_example]: https://github.com/bbenefield89/express-admin-area-example

[create_super_user]: https://asciinema.org/a/Dp11oZs8K0vf6Xqg2J1ord2zi

[package_version]: https://img.shields.io/badge/Version-0.6.2-brightgreen.svg?style=flat-square

[prs_welcome]: https://github.com/bbenefield89/express-admin-area/pulls