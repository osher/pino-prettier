const SUT = require('../')

describe('pino-prettier', () => {
  describe('when called with --config <path>', () => {
    const mockProcess = { argv: ['node', 'bin.js', '-C', 'not.the.config.js'] }
    let result;
    before(() => {
      result = SUT({ process: mockProcess })
    })
    it('should replace it with our baked in file', () => {
      Should(mockProcess.argv.pop().replace(process.cwd(), '~')).eql('~/lib/pino-pretty.config.js')
    })

    it('the returned result should be the pino-pretty settings', () => {
      Should(result)
        .be.an.Object()
        .have.properties({
          levelFirst: true,
          colorize: true,
          translateTime: 'HH:MM:ss.l',
          ignore: 'pid,hostname,caller,name,from,version',
        })
    })

    it('should create a proxy for customPretifiers, based on util.inspect', () => {
        Should(require('util').types.isProxy(result.customPrettifiers)).be.True()
        const v = { a: 1, b: true, c: 2 }
        Should(result.customPrettifiers.abracadabra(v))
            .eql(require('util').inspect(v, { colors: true }))
    })
  })
})
