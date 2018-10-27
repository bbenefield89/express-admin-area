const dashboardGet = async (req, res) => {
  const { db } = res.locals
  const tables = await db.query(
    `
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname='public';
    `
  )

  const tableNames = tables[0].map(table => {
    return {
      tableName: table.tablename,
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