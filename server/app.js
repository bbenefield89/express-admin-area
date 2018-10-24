const express = require('express')

const { adminArea } = require('../build/src/main')

const app = express()

app.use('/admin', adminArea)

app.listen(3000, () => console.log('\n\nServer Online\n\n'))