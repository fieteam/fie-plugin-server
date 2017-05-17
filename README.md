# fie-plugin-server

> 一键开启本地服务器

## 说明

本插件用于快速开启本地服务器, 使用了koa ,自动解析本地各种资源文件, 可以直接在命令行调整,也可以在其他套件/插件里面使用.

## 使用场景

- 尚未有本地服务器的前端项目可以直接调用
- 插件,套件里面的可以调用

## 安装

```
# 安装 fie (若已安装可忽略)
tnpm install @ali/fie
```

## 参数配置

```
{
    server: {
        // 是否自动打开浏览器
        open: true,
        // 自动打开浏览器后打开哪个页面
        openTarget: 'src/index.html',
        // 端口号
        port: 9000,
        // 是否在控制台打印访问日志
        log: false
    }    
}
```

## 用法

### 开启服务器功能 

### 在命令行里面使用

```
$ fie server open                打开服务器
$ fie server br [url] -d [delay] 打开浏览器页面,delay为延迟执行毫秒数
$ fie server help                查看帮助信息
```

### 在套件/插件里面使用

```
const fieModule = require('fie-api').module;

const serverInfo = fieModule.get('fie-plugin-server');


const options = {
    callback(app) {
        // app 为 koa 实例
        console.log('本地服务器启动成功');
    }
};

// _fie 为插件/套件获取到的 _fie 对象
yield server.open(_fie, options);

yield server.br(_fie, {
    clientArgs: ['http://taobao.com/'],
    clientOptions: {
        d: 2000
    }
});

```

## 使用案例

下图执行了 `fie server open`  便立即在浏览打开了 `http://127.0.0.1:9000/demo/index.html`, 并打印访问日志:
![server open](https://img.alicdn.com/tps/TB1lmoVLXXXXXaaXXXXXXXXXXXX-640-537.gif)









