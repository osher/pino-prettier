/**
 * the module exports a factory of a message prettifier.
 * the purpose is to add a `caller` section between the time and the message when either a `log.caller` or `log.from`
 * is found.
 *
 * different caller should get a different color, where caller color for all entries of same caller should be
 * consistent.
 *
 * @param {Array<NumericrStr>} param.callerColors Array of all the shell color num-codes to use, as strings.
 * @param {function} param.colorizeMessage defaults to pino-pretty's usual colorize.message
 * @returns {Function} Formatter Function
 */
module.exports = ({
  callerColors = (
    '20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,'
    + '129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,'
    + '199,200,201,202,203,204,205,206,207,208,209,214,215,220,221'
  ).split(','),
  colorizeMessage = require('pino-pretty').colorizerFactory(true).message,
} = {}) => {
  return event => {
    const { from, caller = from, name, msg } = event
    const message = msg ? ` : ${colorizeMessage(msg)}` : ''

    return caller
      ? `\u001b[38;5;${selectCallerColor(caller)};1m${caller}\u001b[0m${message}`
      : `\u001b[1m${name}\u001b[22m${message}`
  }

  function selectCallerColor(str) {
    const l = str.length
    let hash = 0

    for (let i = 0; i < l; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return callerColors[Math.abs(hash) % callerColors.length]
  }
}
