//HACK: this hack is necessary because were not consuming `pino-prettier` from a package.
//  the hack makes use of pino's support for bundler path-overrides to make the example
//  look more authenic...
global.__bundlerPathsOverrides = { //eslint-disable-line
  'pino-prettier': require('node:path').join(process.cwd(), './lib/pino-target.js'),
}
//HACKend

//logger creation
const disablePretty = process.argv[2] === 'json'
const log = require('pino')(
  disablePretty
    ? {}
    : {
      transport: {
        target: 'pino-prettier',
      },
    },
).child({ name: 'application' })
log.level = 'trace'

class RichError extends Error {
  constructor(msg, meta) { super(msg); Object.assign(this, meta) }
}

//different subchannels can use different callers (ideally, each has its own warn level)
const moi = log.child({ caller: 'moi' })
const loi = log.child({ caller: 'loi' })
const frerre = log.child({ caller: 'frerre' })

//application uses the loggers in different places in the application
log.trace({ some: 'context' }, 'what is it')
loi.debug({ more: 'context' }, 'this is debug info')
log.info({ count: 12 }, 'some milestone happened')
frerre.warn({ err: new Error('oupsy') }, 'im not sure about this')
moi.error({ err: new RichError('OUCH', { code: 'EOUCH', class: 'ouch error' }) }, 'oupsy dazy')
moi.fatal({ err: new RichError('Silence! I kill you!', { code: 'SIGTERM' }) }, 'time to say goodbye')
log.info('exited gracefully')
