# pino-prettier

A terminal pino json-stream beautifier, based on pino-pretty

# usage

Given that your `svr.js` uses `pino` and emits `json-stream` to stdout, then:

```
node svr.js | prettier
```
## installation

### global

```
npm i -g 'pino-prettier'
```
After which, your machine has learnt a new command, `prettier` to which you may pipe the stdoutput of your pino logger program.

### local to project

```
npm i -g 'pino-prettier'
```

After which you may use it in your `package.json` scripts.

e.g.:
```
  "scripts": {
     ...
    "run": "node svr.js | prettier",
    ...
  },
```

## what's the difference from `pino-pretty` ?
 - meta objects are formatted using `util.inspect` which uses colors instead of the noisy`json.stringify`
 - timestamp is "humanized" as just `HH:MM:ss.l`
 - the log channel is part of the formatted main line, and colorized with a unique color per channel.
 - level field appears first, to make its color distinctive against the indent black, and less confusing with the colorized channels.
 - fields are optimized for developer machine (filter out `host`, `pid`, `version`, etc)

## Customization
This first version is customizable as far as CLI arguments supported by `pino-pretty`: it works by hacking the `--config` parameter, and injecting it's own config file, and does some hacky stuff on the way.

However, every customization that is supported by CLI arguments are stronger than the baked-in config file shipped with this package.

Have fun :)
