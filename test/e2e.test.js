/* eslint no-sync: off */

const { exec } = require('child_process')

describe('pino-prettier - e2e', () => {
  const ctx = {}
  before(done => {
    exec('cat test/fx/log.jsonstream.txt | node bin/bin.js', (err, stdout, stderr) => {
      Object.assign(ctx, { err, stdout, stderr })

      //to refresh expected result:
      //require('fs').writeFileSync('test/fx/log.beautified.txt', stdout);

      ctx.expected = require('fs')
        .readFileSync('test/fx/log.beautified.txt')
        .toString()

      done()
    })
  })

  it('should not emit anything to stderr', () => Should(ctx.stderr).eql(''))
  it('should emit the expected output', () => Should(ctx.stdout).eql(ctx.expected).be.ok())
})
