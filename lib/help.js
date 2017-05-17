'use strict';

const chalk = require('chalk');

module.exports = function* () {
  const help = [
    '',
    'fie-plugin-server 插件使用帮助:',
    ' $ fie server open                打开服务器',
    ' $ fie server br [url] -d [delay] 打开浏览器页面,-d为延迟执行毫秒数',
    ' $ fie server help                查看帮助信息',
    '',
    '关于 server 插件的配置可查看: https://github.com/fieteam/fie-plugin-server',
    '',
    ''
  ].join('\r\n');

  process.stdout.write(chalk.magenta(help));
};
