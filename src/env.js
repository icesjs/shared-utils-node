// 默认的环境变量数据转换函数
function defaultEnvParser(val) {
  let parsedVal
  if (val === 'undefined') {
    parsedVal = undefined
  } else if (val === 'null') {
    parsedVal = null
  } else if (/^(true|false)$/.test(val)) {
    // 为true或false的字符串，转换为布尔值
    parsedVal = RegExp.$1 === 'true'
  } else if (/^-?(?:\d+\.)?\d+$/.test(val)) {
    // 满足完整数值格式的字符串，转换为数值类型
    parsedVal = +val
  } else {
    parsedVal = val.trim()
  }
  return parsedVal
}

// 匹配vue app环境变量数据
function matchVueAppDataKey(key) {
  return /^(vue_)?(app_.+)$/i.exec(key)
}

/**
 * 获取进程环境变量信息（包含普通环境变量与应用数据变量）
 * @param parser (val) => any
 * @returns {{}}
 */
exports.parseProcessEnv = (parser = defaultEnvParser) => {
  const env = {}
  // 转换数据类型
  for (const [key, val] of Object.entries(process.env)) {
    env[key] = parser(val)
  }
  return env
}

/**
 * 解析构建环境变量（不包含应用数据变量）
 * @param parser (val)=>any
 * @returns {{}}
 */
exports.parseBuildEnv = (parser = defaultEnvParser) => {
  const env = {}
  for (const [key, val] of Object.entries(process.env)) {
    if (!matchVueAppDataKey(key)) {
      env[key] = parser(val)
    }
  }
  return env
}

/**
 * 从环境变量中解析Vue应用数据
 * @param parser (val)=>any
 * @returns {{}}
 */
exports.parseVueAppData = (parser = defaultEnvParser) => {
  const data = {}
  for (const [key, val] of Object.entries(process.env)) {
    const matched = matchVueAppDataKey(key)
    if (matched) {
      const parsedVal = parser(val)
      data[key] = data[key.toLowerCase()] = data[key.toUpperCase()] = parsedVal
      if (matched[1]) {
        // 去掉vue_前缀保存一份数据
        const dataKey = matched[2]
        data[dataKey] = data[dataKey.toLowerCase()] = data[
          dataKey.toUpperCase()
        ] = parsedVal
      }
    }
  }
  return data
}

/**
 * 加载环境变量文件
 * @param opts 参考 dotenv 的配置
 * @param overwrite 是否覆盖当前进程已定义的环境变量
 * @returns {{parsed: {}, error: Error}}
 */
exports.loadEnv = function (opts, overwrite) {
  const result = {}
  const dot = require('dotenv')
  if (typeof opts === 'string') {
    opts = { path: opts }
  } else if (opts instanceof Buffer) {
    opts = { src: opts }
  } else if (!opts) {
    opts = {}
  }
  if (overwrite) {
    try {
      // 覆盖环境变量中已定义的值
      result.parsed = {}
      const buf = opts.path ? require('fs').readFileSync(opts.path) : opts.src
      for (const [key, val] of Object.entries(dot.parse(buf))) {
        result.parsed[key] = val
        process.env[key] = val
      }
    } catch (e) {
      result.error = e
    }
  } else {
    // 不覆盖已经定义的值
    // 存在覆盖时会抛出异常
    Object.assign(result, dot.config(opts))
  }
  // {parsed:{}, error:null}
  return result
}
