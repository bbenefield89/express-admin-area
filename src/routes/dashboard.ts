const dashboardGet = async (req, res) => {
  const models = Object.keys(res.locals.models)
  const tables = [ 'Admins', ...models ]
  const tableNames = tables.map(table => {
    return {
      tableName: table,
      url: req.originalUrl
    }
  })

  res.render('dashboard', { tableNames, pageTitle: 'Dashboard' })
}

/**
 * @todo this will later be used to create/delete/modify new tables in the db
 *       for now though this will sit here and be useless
 */
const dashboardPost = async (req, res) => {
  // const { db } = res.locals
  const { tableName, ...rest } = req.body
  
  res.send(rest)
}

export { dashboardGet, dashboardPost }

// curl -X POST -H "Content-Type: application/json" -d '{"tableName": "users", "username": "{"type": "Sequelize.STRING", "allowNull": false, }"}'