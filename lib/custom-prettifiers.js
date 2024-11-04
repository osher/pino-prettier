/**
 * the module exports a factory of a pino custom-pretifiers map
 * the purpose is that the meta properties will be pretified using util.inspect.
 *
 * under the hood, the produced custom-pretifiers map is a proxy that defaults to `util.inspect` for every property
 * that is not already formatted in the leading line
 *
 * @param {Array<StrPropName>} options.innerProperties
 *  property names as strings that should default to the usual formatting
 * @returns {map<prop, function|null>}
 *  pino custom-formatters object
 */
module.exports = ({
  innerProperties = 'level,time'.split(','),
  util: { inspect } = require('util'),
  depth = 10,
  colors = true,
  format = v => inspect(v, { depth, colors }),
} = {}) => new Proxy({}, {
  get: (_, prop) => innerProperties.includes(prop) ? null : format,
})
