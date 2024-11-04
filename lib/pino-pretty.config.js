module.exports = {
  levelFirst:           true,
  colorize:             true,
  translateTime:        'HH:MM:ss.l',
  ignore:               'pid,hostname,caller,name,from,version,v',
  customPrettifiers:    require('./custom-prettifiers.js')(),
  errorLikeObjectKeys:  ['err', 'error'],
  messageFormat:        require('./format-message.js')(),
}
