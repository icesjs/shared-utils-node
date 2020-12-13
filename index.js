// 导出所有的模块
const fs = require('fs')
const path = require('path')
const lib = path.join(__dirname, 'lib')

for (const m of fs.readdirSync(lib)) {
  Object.assign(exports, require(path.join(lib, m)))
}

// 如果不导入所有的模块，可以通过路径来导入需要用到的模块，如：
// const { loadEnv } = require('@ices/shared-utils-node/lib/env')
