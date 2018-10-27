const tableDataGet = async (req, res) => {
  const { tableName } = req.params
  const { db } = res.locals
  const tableData = await db.query(`SELECT * FROM ${ tableName }`)
  const fieldNames = tableData[1].fields.map(field => field.name)
  const rows = tableData[0]
  const locals = {
    fieldNames,
    rows,
    tableName,
    pageTitle: tableName
  }
  
  res.render('tableData', locals)
}

export { tableDataGet }