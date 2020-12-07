const shell = require('shelljs')

const paths = require('../../config/paths')

module.exports = function exec(command, options) {
  const resolvedOptions = {
    cwd: paths.root,
    fatal: true,
    ...options,
    async: false,
  }
  const o = shell.exec(command, resolvedOptions)
  if (resolvedOptions.fatal && o.code !== 0) {
    process.exit(o.code)
  }
  return o
}
