const fs = require('fs')

const modules = fs.readdirSync(__dirname)
for (const m of modules) {
  if (m !== 'index.js') {
    Object.assign(exports, require(`./${m}`))
  }
}
