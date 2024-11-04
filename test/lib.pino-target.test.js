const SUT = require('../lib/pino-target.js')

describe('lib/pino-target', () => {
  it('should be a factory function that does not accept arguments', () => {
    Should(SUT).be.a.Function().property('length', 0)
  })
  describe('when called', () => {
    it('should return an instance of a Transform', () => {
      Should(SUT().constructor).property('name', 'Transform')
    })
  })
})
