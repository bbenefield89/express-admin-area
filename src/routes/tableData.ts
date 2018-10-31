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

const tableDataPost = async (req, res) => {
  const { db } = res.locals
  const { tableName, ...rest } = req.body
  const fields = Object.keys(rest).join(', ') + ', "createdAt", "updatedAt"'
  const values = Object.values(rest)
  const valuePlaceholders = '?'.repeat(values.length).split('').join(', ') + ', CURRENT_TIMESTAMP'.repeat(2)
  const rawSQL = `
    BEGIN;

    INSERT INTO ${ tableName } (${ fields })
      VALUES (${ valuePlaceholders });

    SELECT * FROM ${ tableName }
      ORDER BY id DESC
      LIMIT 1;

    END;
  `
  const data = await db.query(rawSQL, { replacements: values })

  res.send(data[0][0])
}

const tableDataDelete = async (req, res) => {
  const { tableName, id } = req.body
  const { db } = res.locals
  
  try {
    await db.query(`DELETE FROM ${ tableName } where id=?`, {
      replacements: [ id ]
    })

    res.status(204).send({})
  }
  catch(err) {
    res.status(500).send({ error: 'Error while attempting to delete' })
  }
}

export { tableDataGet, tableDataPost, tableDataDelete }