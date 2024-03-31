# 使用 `npm run docs:dev` 开启 VitePress 本地服务器提示 `Error: listen EACCES`

## 问题

想启动 VitePress 本地服务器，执行 `npm run docs:dev` 命令时，出现 `Error: listen EACCES`:

```
$ npm run docs:dev

> docs:dev
> vitepress dev draft

failed to start server. error:
Error: listen EACCES: permission denied ::1:5173
    at Server.setupListenHandle [as _listen2] (node:net:1734:21)
    at listenInCluster (node:net:1799:12)
    at GetAddrInfoReqWrap.doListen [as callback] (node:net:1948:7)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:110:8)
```

## 解决

以管理员身份运行 CMD，执行：

1. `net stop winnat`
2. `net start winnat`

```
$ net stop winnat

The Windows NAT Driver service was stopped successfully.


$ net start winnat

The Windows NAT Driver service was started successfully.
```

## 参考

- [node.js - listen EACCES: permission denied in windows - Stack Overflow](https://stackoverflow.com/a/67968597)
