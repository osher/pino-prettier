const SUT = require('../lib/pino-target.js')

describe('lib/pino-target', () => {
  it('should be a factory function that does not require any arguments', () => {
    Should(SUT).be.a.Function().with.arity(0)
  })
  describe('when called', () => {
    it('should return an instance of a Transform', () => {
      Should(SUT().constructor).property('name', 'Transform')
    })
  })
})
