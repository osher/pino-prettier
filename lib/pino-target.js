const pinoPrettyFactory = require('pino-pretty')
const options = require('./pino-pretty.config.js')

module.exports = () => pinoPrettyFactory(options)
