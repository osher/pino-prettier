const { inspect } = require('util')

const customPrettifiers = new Proxy({}, {
  get: () => v => inspect(v, { depth: 10, colors: true }),
})

module.exports = {
  levelFirst:       true,
  colorize:         true,
  translateTime:    'HH:MM:ss.l',
  ignore:           'pid,hostname,caller,name,from,version',
  customPrettifiers,
}
