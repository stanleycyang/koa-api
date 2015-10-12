'use strict'

const MongoDB = require('mongodb')
const config = require('../config')

module.exports = new Promise((resolve, reject) => {
  MongoDB.connect(config.MONGODB_URI, (err, db) => {
    if (err) return reject(err)
    resolve(db)
  })
})
