// 导出所有的模块
for (const m of require('fs').readdirSync(__dirname)) {
  if (m !== 'index.js') {
    Object.assign(exports, require(`./${m}`))
  }
}

// 如果不导入所有的模块，可以通过路径来导入需要用到的模块，如：
// const { loadEnv } = require('@ices/shared-utils-node/lib/env')
