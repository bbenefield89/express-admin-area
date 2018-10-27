#! /usr/bin/env node

const shell = require('shelljs')
const fs = require('fs')

console.log(process.argv)

fs.readdir('./', (err, data) => {
  if (err)
    throw new Error(err)

  console.log(data)
})