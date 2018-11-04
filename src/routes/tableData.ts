import { Admin } from '../models/Admin'
import { rowDataGet, rowDataPut } from './rowData'

/**
 * GET
 */
const tableDataGet = async (req, res) => {
  if (req.query.id) {
    return rowDataGet(req, res)
  }
  
  const { db, models } = res.locals
  const tableName = req.params.tableName.toLowerCase()
  let model

  if (tableName !== 'admins') {
    model = models[ tableName ]
  }
  else {
    model = Admin(db)
  }
  
  const describeTableQuery = await db.queryInterface.QueryGenerator.describeTableQuery(tableName)
  const describeTable = await db.query(describeTableQuery)
  const rows = await model.findAll()
  const fieldNames = describeTable[0].map(({ Field }) => Field)
  const locals = {
    fieldNames,
    rows,
    tableName,
    pageTitle: tableName,
    url: req.originalUrl
  }
  
  res.render('tableData', locals)
}

/**
 * POST
 */
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

/**
 * DELETE
 */
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

const tableDataPut = (req, res) => rowDataPut(req, res)

export { tableDataGet, tableDataPost, tableDataDelete, tableDataPut }