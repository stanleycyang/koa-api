'use strict'

// Load ENV variables
require('dotenv').load()

// Set the variables here
exports.port = process.env.PORT || 3100
exports.env = process.env.PORT || 'development'
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/boilerplate'
