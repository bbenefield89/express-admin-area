const dashboardGet = async (_req, res) => {
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
      url: _req.originalUrl
    }
  })

  res.render('dashboard', { tableNames })
}

export { dashboardGet }