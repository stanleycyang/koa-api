'use strict'

const compose = require('koa-compose')
const path = require('path')
const koa = require('koa')
const cors = require('kcors')

const config = require('../config')

const app = module.exports = koa()

// Add CORS
app.use(cors())

//compress everything. Reduce 70% size of the packets going around the the website
// gzip compatible browser requests to a web server, a web server can compress the response to the browser back and the browser can decompress the response and finally the browser get the original response
app.use(require('koa-compress')({
  // To make it work with streaming
  // flush: require('zlib').Z_SYNC_FLUSH
}))

// HTTP Caching
app.use(require('koa-fresh')())
//ETag or entity tag is a part of HTTP, and it is one of several mechanisms that provides cache validation, which allows a client to make conditional requests. This allows caches to be more efficient, and saves bandwidth, since the web server does not need to send a full response if the content has not changed.
app.use(require('koa-etag')())

// Mount the API routes
app.use(require('koa-mount')('/api', compose(require('./api'))))
app.use(compose(require('./routes')))

// Server static files
app.use(require('koa-static')(path.resolve('static'), {
  maxage: config.env === 'production'
    ? 31536000 // brower cache max-age in milliseconds
    : 0, // default
  hidden: false,
  index: false
}))

// serve the favicon
app.use(require('koa-static')(require('favicon'), {
  maxage: 31536000,
  hidden: false,
  index: false
}))

// 301 redirect back home on 404
app.use(function * (next) {
  this.status = 301
  this.redirect('/')
})
