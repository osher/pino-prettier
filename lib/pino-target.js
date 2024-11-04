const pinoPrettyFactory = require('pino-pretty')
const bakedInOptions = require('./pino-pretty.config.js')

module.exports = (options = {}) => pinoPrettyFactory({ ...bakedInOptions, ...options })
