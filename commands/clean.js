const fs = require('fs-extra')

const paths = require('../config/paths')
const cmd = require('./_tools/cmd')

const command = 'clean'
const builder = {}
const handler = () => {
  clean()
}

function clean() {
  fs.removeSync(paths.config)
  fs.removeSync(paths.products)
  fs.removeSync(paths.xcconfig)
  fs.removeSync(paths.xcconfigDebug)
}

module.exports = cmd(command, handler, builder)
