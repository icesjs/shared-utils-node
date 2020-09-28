// 获取进程环境变量信息
exports.getProcessEnv = () => {
  const env = {}
  const data = {}
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
    // 匹配应用注入数据
    const mat = /^(vue_)?(app_.+)$/i.exec(key)
    if (mat) {
      env[key.toLowerCase()] = env[key.toUpperCase()] = env[key]
      data[key.toLowerCase()] = data[key.toUpperCase()] = env[key]
      if (mat[1]) {
        // 去掉vue_前缀保存一份数据
        data[mat[2]] = data[mat[2].toLowerCase()] = data[mat[2].toUpperCase()] =
          env[key]
      }
    }
  }
  // env为普通环境变量数据
  // data为应用定义的环境变量数据，可注入应用代码中
  return { env, data }
}
