/**
 * 获取进程运行参数信息
 * @param setup 参考minimist配置
 * @returns {{args: {}, rawArgv: string[]}}  args属性参考minimist返回值
 */
exports.getProcessArgs = (setup) => {
  const rawArgv = process.argv.slice(2)
  const args = require('minimist')(rawArgv, setup)
  if (!args._) {
    args._ = []
  }
  // rawArgv是原始的命令行参数数组，所有值都未经数据类型格式处理
  return { args, rawArgv }
}

/**
 * 获取Vue CLi参数
 * @returns {{args: {}, rawArgv: string[], command: string}} 属性command为当前执行的vue cli命令名
 */
exports.getVueCLIArgs = () => {
  const { args, rawArgv } = exports.getProcessArgs({
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
  return { args, rawArgv, command: (args._[0] || '').trim().toLowerCase() }
}
