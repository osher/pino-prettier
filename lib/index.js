const configFile = require('path').join(__dirname, 'pino-pretty.config.js')

prettier.configFile = configFile
module.exports = prettier

function prettier({
  process,
  prettyUtil = require('pino-pretty/lib/utils'),
  colors     = (
    '20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,'
    + '129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,'
    + '199,200,201,202,203,204,205,206,207,208,209,214,215,220,221'
  ).split(','),
}) {
  const { prettifyMessage } = prettyUtil
  prettyUtil.prettifyMessage = args => {
    const { log: { caller, name } } = args

    const pmsg = prettifyMessage(args)
    const message = pmsg ? ` : ${pmsg}` : ''

    return caller
      ? `\u001B[38;5;${selectColor(caller)};1m${caller}\u001B[0m${message}`
      : `\u001b[1m${name}\u001b[22m${message}`
  }

  const ix = process.argv.findIndex(s => s === '--config' || s === '-C')

  ix === -1
    ? process.argv.push('--config', configFile)
    : process.argv[ix + 1] = configFile

  return require(configFile)

  function selectColor(str) {
    const l = str.length
    let hash = 0

    for (let i = 0; i < l; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return colors[Math.abs(hash) % colors.length]
  }
}
