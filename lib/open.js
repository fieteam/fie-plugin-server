'use strict';

const api = require('fie-api');
const koa = require('koa');
const logger = require('koa-logger');
const staticServe = require('koa-static');
const serverIndex = require('koa-serve-index');
const open = require('open');

const cwd = process.cwd();
const config = api.config;
const log = api.log('fie-plugin-server');

module.exports = function* (fie, options) {
  options = options || {};

  const serverConfig = Object.assign({}, {
    host: '127.0.0.1',
    port: 9000,
    open: true,
    openTarget: 'demo/index.html',
    log: true
  }, config.get('server'), options.config);


  log.info('正在启动本地服务器...');

  // 以下是在fie内部启动koa服务器,各sdk只需要添加中间件即可
  const app = koa();

  // 显示html列表
  app.use(serverIndex(cwd));

  // 打印日志
  serverConfig.log && app.use(logger('dev'));

  // 监听端口
  const server = app.listen(serverConfig.port, () => {
    log.success('本地服务器启动成功');
    // 打开浏览器
    if (serverConfig.open) {
      open(`http://${serverConfig.host}:${serverConfig.port}/${serverConfig.openTarget}`);
    }
  });

  // 静态文件服务器
  app.use(staticServe(cwd));

  options.callback && options.callback(app);

  // 异常处理
  process.on('uncaughtException', () => {
    // 此处无须再打印日志,因为在 bin/fie 下已经打印过了
    server.on('request', (req, res) => {
      // Let http server set `Connection: close` header, and close the current request socket.
      req.shouldKeepAlive = false;
      if (!res._header) {
        res.setHeader('Connection', 'close');
      }
    });
  });
};
