const minimist = require('minimist')

// 获取进程运行参数信息
exports.getProcessArgs = () => {
  const rawArgv = process.argv.slice(2)
  const args = minimist(rawArgv, {
    // 下面是Vue CLI的一些命令参数
    boolean: [
      'modern',
      'report',
      'report-json',
      'inline-vue',
      'watch',
      'open',
      'copy',
      'https',
      'verbose',
    ],
  })
  const command = (args._[0] || '').trim().toLowerCase()
  // rawArgv是原始的命令行参数数组，所有值都未经数据类型格式处理
  return { args, rawArgv, command }
}
