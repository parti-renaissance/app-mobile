const fs = require('fs-extra')
const mustache = require('mustache')

module.exports = function preprocess(srcPath, dstPath, view) {
  const template = fs.readFileSync(srcPath).toString()
  const str = mustache.render(template, view)
  fs.outputFileSync(dstPath, str)
}
