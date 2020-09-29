/**
 * 获取进程环境变量信息
 * @param parser  (val, key, env) => any
 * @returns {{}}
 */
exports.parseProcessEnv = (parser) => {
  const env = {}
  // 转换数据类型
  for (const [key, val] of Object.entries(process.env)) {
    if (val === 'undefined') {
      env[key] = undefined
    } else if (val === 'null') {
      env[key] = null
    } else if (/^(true|false)$/.test(val)) {
      // 为true或false的字符串，转换为布尔值
      env[key] = RegExp.$1 === 'true'
    } else if (/^-?(?:\d+\.)?\d+$/.test(val)) {
      // 满足完整数值格式的字符串，转换为数值类型
      env[key] = +val
    } else {
      env[key] = val.trim()
    }
    if (typeof parser === 'function') {
      const res = parser(val, key, env)
      if (res !== undefined) {
        env[key] = res
      }
    }
  }
  return env
}

/**
 * 解析Vue应用环境变量数据
 * @returns {{data: {}, env: {}}}
 */
exports.parseVueAppEnv = () => {
  const data = {}
  const env = exports.parseProcessEnv((val, key, env) => {
    const matched = /^(vue_)?(app_.+)$/i.exec(key)
    if (matched) {
      const lowerKey = key.toLowerCase()
      const upperKey = key.toUpperCase()
      env[lowerKey] = env[upperKey] = env[key]
      data[lowerKey] = data[upperKey] = env[key]
      if (matched[1]) {
        // 去掉vue_前缀保存一份数据
        const dataKey = matched[2]
        data[dataKey] = data[dataKey.toLowerCase()] = data[
          dataKey.toUpperCase()
        ] = env[key]
      }
    }
  })
  return { env, data }
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
