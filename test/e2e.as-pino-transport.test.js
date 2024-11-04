const { exec } = require('child_process')

describe('pino-prettier - used as pino transport', () => {
  const ctx = {}
  //TRICKY: times produced in run time will differ from the recorded times in the beautified sample
  //  the test uses this function to replace times from both expected and found with zeros
  const zerofyTimes = str => str.replace(/\[[\d:.]+\]/g, '[00:00:00.000]')
  //TRICKYEnd
  //TRICKY: removes stack-trace entries that appear only in cover mode :shrug:
  const normalizeStackTraces = str => str
    .replace(/^.*node_modules\/append-transform\/index.*$/gm, '')
    .replace(/\n\n/g, '\n')
  //TRICKYEnd

  before(done => {
    exec('node test/fx/uses-pino.js', (err, stdout, stderr) => {
      stdout = zerofyTimes(stdout)
      stdout = normalizeStackTraces(stdout)

      Object.assign(ctx, { err, stdout, stderr })

      ctx.expected = zerofyTimes(
        require('node:fs').readFileSync('test/fx/log.beautified.txt').toString() //eslint-disable-line
      )

      done()
    })
  })

  it('should not emit anything to stderr', () => Should(ctx.stderr).eql(''))
  it('should emit the expected output', () => Should(ctx.stdout).eql(ctx.expected).be.ok())
})
