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
    pageTitle: tableName,
    url: req.originalUrl
  }
  
  res.render('tableData', locals)
}

const tableDataDelete = async (req, res) => {
  const { tableName, id } = req.body
  const { db } = res.locals
  
  try {
    await db.query(`DELETE FROM ${ tableName } where id=?`, {
      replacements: [ id ]
    })

    res.status(204).send()
  }
  catch(err) {
    res.status(500).send({ error: 'Error while attempting to delete' })
  }
}

export { tableDataGet, tableDataDelete }