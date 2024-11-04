const SUT = require('../lib/set-config-cli-switch.js')

describe('lib/set-config-cli-switch', () => {
  it('should be a factory function that does not require any arguments', () => {
    Should(SUT).be.a.Function().with.arity(0)
  })

  describe('when called without --config <path> in process.argv', () => {
    const mockProcess = { argv: ['node', 'bin.js', '-C', 'not.the.config.js'] }
    before(() => {
      SUT({ process: mockProcess })
    })
    it('should add the -C switch pointing to our baked in pino-config', () => {
      Should(mockProcess.argv.slice(-2)).eql([
        '-C',
        `${process.cwd()}/lib/pino-pretty.config.js`,
      ])
    })
  })

  describe('when called with --config <path> in process.argv', () => {
    const mockProcess = { argv: ['node', 'bin.js', '-C', 'not.the.config.js'] }
    before(() => {
      SUT({ process: mockProcess })
    })
    it('should replace the value with our baked in pino-config', () => {
      Should(mockProcess.argv.pop().replace(process.cwd(), '~')).eql('~/lib/pino-pretty.config.js')
    })
  })
})
