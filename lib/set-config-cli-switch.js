/**
 * The concern of this file is to make sure `pino-pretty` uses the configurations this module provides.
 *
 * if `--config` switch is found - it's value is updated.
 * else - a `--config` switch is added with the path to the config this module provides.
 *
 * it exports a factory that accepts an optional options object
 *
 * @param {optional/object} options not necessary outside of test environments
 * @param {optional/process} options.process defaults to the global process, used to mutate `process.argv`
 * @param {optional/string} options.configFile defaults to the `pino-pretty.config.js` next to this file.
 * @returns {*} pino config, relevant only for tests (see usage on bin/bin.js)
 */
module.exports = function prettier({
  process = global.process,
  configFile = require('path').join(__dirname, 'pino-pretty.config.js'),
} = {}) {
  const ix = process.argv.findIndex(s => s === '--config' || s === '-C')

  ix === -1
    ? process.argv.push('--config', configFile)
    : process.argv[ix + 1] = configFile

  return require(configFile)
}
