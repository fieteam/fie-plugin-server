'use strict';

const api = require('fie-api');
const open = require('open');

const log = api.log('fie-plugin-server');

module.exports = function* (fie, options) {
  const serverConfig = fie.getModuleConfig('server');
  const delay = parseInt(serverConfig.d, 10) || 0;
  const cb = options.callback || (() => {});

  let url = options.clientArgs.shift();

  if (!url) {
    log.error('请正确填写需要打开的 URL 地址');
    cb();
  }


  setTimeout(() => {
    // 补全 scheme
    if (!(/^https?:/.test(url))) {
      // 兼容 www.xxx.com 的形式
      if (!(/^\/\//.test(url))) {
        url = `//${url}`;
      }
      url = `http:${url}`;
    }
    open(url);
    cb();
  }, delay);
};
