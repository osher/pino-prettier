/* eslint max-lines-per-function: off , no-underscore-dangle: off */
const faker = require('faker')
const SUT = require('../lib/format-message.js')

describe('lib/format-message', () => {
  it('should be a factory function that does not require any mandatory argument', () => {
    Should(SUT).be.a.Function().with.arity(0)
  })

  describe('calling a formatter obtained by the factory', () => {
    const formatter = SUT()
    describe('with a log entry without caller', () => {
      it('should include the entry.name and the entry.msg', () => {
        const formatted = formatter({ msg: 'the-message', name: 'the-name' })
        //const plainText = formatted.replace(/[^\p{Script=Latin}]+/gu, ' ');
        const plainText = stripColors(formatted)

        Should(plainText).match(/the-name .* the-message/)
      })
    })

    describe('with a log entry without message', () => {
      it('should include the entry.name and the entry.msg', () => {
        const formatted = formatter({ name: 'the-name' })
        //const plainText = formatted.replace(/[^\p{Script=Latin}]+/gu, ' ');
        const plainText = stripColors(formatted)

        Should(plainText).match(/the-name/)
      })
    })

    describe('with a log entry that has a caller', () => {
      it('it should include the entry.caller and the entry.msg', () => {
        const formatted = formatter({ msg: 'the-message', name: 'the-name', from: 'the-caller', caller: 'the-caller' })
        const plainText = stripColors(formatted)

        Should(plainText).match(/the-caller .* the-message/)
      })

      it('it should include the entry.from and the entry.msg', () => {
        const formatted = formatter({ msg: 'the-message', name: 'the-name', from: 'the-from' })
        const plainText = formatted.replace(/\x1B\[[0-9;]*?m/g, '') //eslint-disable-line no-control-regex

        Should(plainText).match(/the-from .* the-message/)
      })
    })
    describe('when called with multiple lines with multiple callers', () => {
      const ctx = {}

      /*
        Arrange: generate 100 mock entries
       */
      before(() => {
        const _10Names = Array.from(Array(10)).map(() => faker.name.firstName())
        const rndCaller = () => _10Names[Math.floor(Math.random() * 10)]
        const rndMsg = () => faker.lorem.sentence()

        const _100entries = Array.from(Array(100)).map(() => ({
          name: 'WRONG', caller: rndCaller(), msg: rndMsg(),
        }))

        ctx.entries = _100entries
        ctx.formattedEntries = _100entries.map(formatter)
        ctx.usedColors = ctx.formattedEntries.reduce((acc, formatted) => {
          const { caller, color } = callerNameAndColor(formatted)
          const callerColors = acc[caller] || (acc[caller] = [])
          if (!callerColors.includes(color)) callerColors.push(color)
          return acc
        }, {})
      })

      it('should allocate different colors to differetn callers', () => {
        const uniqueColors = Object
          .values(ctx.usedColors)
          .reduce(
            (uniqueColors, callerColors) => callerColors.reduce(
              (usedColors, color) => uniqueColors.includes(color) ? uniqueColors : [...uniqueColors, color],
              uniqueColors,
            ),
            [],
          )

        //TRICKY
        // - the chance that two different random callers will get the same colors can be a source of flakiness
        //   the chance that it happens multiple times is acceptable
        const minExpdetedCount = 8
        //TRICKYEnd
        Should(uniqueColors.length).be.greaterThanOrEqual(minExpdetedCount)
      })
      it('should be consistent about the colors each caller get', () => {
        //callers that got more than one color
        const multipleColors = Object.entries(ctx.usedColors).filter(([, colors]) => colors.length !== 1)

        Should(multipleColors).eql([])
      })
    })
  })
})

function stripColors(str) {
  return str.replace(/\x1B\[[0-9;]*?m/g, '') //eslint-disable-line no-control-regex
}

function callerNameAndColor(str) {
  const xColorAndCaller = /.*\x1b\[38;5;(\d+);1m(\w+)\x1b\[0.*/g //eslint-disable-line no-control-regex
  const [, color, caller] = xColorAndCaller.exec(str)
  return { color, caller }
}

