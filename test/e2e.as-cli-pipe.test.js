/* eslint no-sync: off */

const { exec } = require('child_process')

describe('pino-prettier - used as shell command to pipe into', () => {
  const ctx = {}
  before(done => {
    exec('cat test/fx/log.jsonstream.txt | node bin/bin.js', (err, stdout, stderr) => {
      Object.assign(ctx, { err, stdout, stderr })

      ctx.expected = require('fs')
        .readFileSync('test/fx/log.beautified.txt')
        .toString()

      done()
    })
  })

  it('should not emit anything to stderr', () => Should(ctx.stderr).eql(''))
  it('should emit the expected output', () => Should(ctx.stdout).eql(ctx.expected).be.ok())
})
