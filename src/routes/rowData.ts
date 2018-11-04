/**
 * GET
 */
const rowDataGet = async (req, res) => {
  const { id } = req.query
  const { db, models } = res.locals
  const tableName = req.params.tableName.toLowerCase()
  const model = models[ tableName ]
  const row = await model.findById(id)
  const locals = {
    row,
    tableName,
    url: req.originalUrl
  }
  
  res.render('rowData', locals)
}

/**
 * PUT
 */
const rowDataPut = async (req, res) => {
  const { tableName } = req.params
  const { id } = req.query
  const { models } = res.locals
  const { body } = req
  const model = models[ tableName ]
  const updated = await model.update(body, { where: { id }})

  res.send({ data: updated })
}

export { rowDataGet, rowDataPut }