const { inspect } = require('util')
const faker = require('faker')
const SUT = require('../lib/custom-prettifiers.js')

describe('lib/custom-prettifiers', () => {
  it('should be a factory function that does not require any mandatory argument', () => {
    Should(SUT).be.a.Function().with.arity(0)
  })

  describe('formatter obtained by the factory', () => {
    let prettifiers
    before(() => {
      prettifiers = SUT()
    })
    it('should return null for `level`', () => {
      Should(prettifiers.level).not.be.ok()
    })
    it('should return null for `time`', () => {
      Should(prettifiers.time).not.be.ok()
    })
    it('should return a formater that uses util.inspect for other attribute', () => {
      Array.from(Array(10)).forEach(() => {
        const value = { a: Math.floor(Math.random() * 1000), b: faker.address.zipCode() }
        const prop = faker.name.firstName()//no matter what the prop is

        const expected = inspect(value, { colors: true })

        Should(prettifiers[prop](value)).eql(expected)
      })
    })
  })
})
