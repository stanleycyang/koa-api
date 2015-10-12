'use strict'

const compose = require('koa-compose') // Compose middleware. This allows us to plug and play middleware where we need it. ie. compose([a, b, c])
const path = require('path')
const koa = require('koa')
const cors = require('kcors')

const config = require('../config')

const app = module.exports = koa()

// Compress the packets
app.use(require('koa-compress')({
  // To make it work with streaming
  // flush: require('zlib').Z_SYNC_FLUSH
}))

// HTTP Caching
app.use(require('koa-fresh')())
app.use(require('koa-etag')())

// Mount the API routes
app.use(require('koa-mount')('/api', compose(require('./api'))))
app.use(compose(require('./routes')))

// serve static files
app.use(require('koa-static')(path.resolve('static'), {
  maxage: config.env === 'production'
    ? 31536000
    : 0,
  hidden: false,
  index: false
}))

// Serve favicon
app.use(require('koa-favicon')(path.resolve('static/favicon.ico'), {
  maxAge: 31536000 // cache-control max-age directive in ms, defaults to 1 day
}))

// Redirect 404 pages back to homepage
app.use(function * (next) {
  this.status = 301
  this.redirect('/')
})
