# Nginx 反向代理实现 VitePress 站点部署到腾讯云服务器

## 目标

将 VitePress 站点部署到腾讯云服务器，访问 [www.tangjiayan.com](https://www.tangjiayan.com/) 时打开设计好的网站。

![homepage](https://cdn.tangjiayan.com/notes/web-build/vitepress/vitepress-tencent-cloud/homepage.png)

主页的设计之后会另写一篇笔记。

## 备份站点

使用 WordPress 插件 [UpDraftPlus](https://wordpress.org/plugins/updraftplus/) 将原站点备份。

![backup](https://cdn.tangjiayan.com/notes/web-build/vitepress/vitepress-tencent-cloud/backup.png)

## 重装服务器

备份好之后，在腾讯云轻量应用服务器后台把操作系统重装一下，原来是 `CentOS 7.6`，重装为 `Debian 12`。

![tencent-reinstall-os](https://cdn.tangjiayan.com/notes/web-build/vitepress/vitepress-tencent-cloud/tencent-reinstall-os.png)

## 服务器安装 Node.js 和 npm

服务器系统重装好后，使用 Xshell 通过 SSH 连接到服务器，进行命令行操作。

使用 [apt](https://en.wikipedia.org/wiki/APT_(software)) 安装 `nodejs` 和 `npm`：

```sh
apt install nodejs
```

```sh
apt install npm
```

```sh
$ node -v
v18.13.0
```

```sh
$ npm -v
9.2.0
```

## 创建 VitePress 站点文件夹并初始化

### 创建 VitePress 站点文件夹

我选择在 `/usr/local` 下创建 VitePress 站点文件夹。

```sh
cd /usr/local
mkdir vitepress
cd vitepress
mkdir www
```

### VitePress 初始化

```sh
npm add -D vitepress
```

```sh
npx vitepress init
```

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.
```

## VitePress 站点上传到服务器

在本地设计好 VitePress 主页后，使用 Bitvise 将本地的 VitePress 站点上传到服务器。

![upload](https://cdn.tangjiayan.com/notes/web-build/vitepress/vitepress-tencent-cloud/upload.png)

::: details `Permission denied` 问题

一开始我是直接将整个 VitePress 文件夹上传到服务器上的，但在服务器运行 `npm run docs:dev` 时，会出现 `Permission denied` 问题：

```
$ npm run docs:dev

> docs:dev
> vitepress dev docs

sh: 1: vitepress: Permission denied
root@VM-16-14-debian:/usr/local/vit
```

:::

这时试一下 `npm run docs:dev`，会运行成功：

```
$ pwd
/usr/local/vitepress/www
```

```
$ npm run docs:dev

 vitepress v1.0.0-rc.12

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

接下来要配置 Nginx 反向代理将 HTTP / HTTPS 请求转发给这个端口。

## 安装 Nginx，查找其安装路径

用 [apt](https://www.runoob.com/linux/linux-comm-apt.html) 命令安装 nginx：

```
apt install nginx
```

用 [whereis](https://www.runoob.com/linux/linux-comm-whereis.html) 命令查找其路径：

```
$ whereis nginx
nginx: /usr/sbin/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

经查看，`nginx.conf` 是在 `/etc/nginx` 目录下。

## Nginx 反向代理和 SSL 配置

::: details 参考

- [nginx学习，看这一篇就够了_java冯坚持的博客-CSDN博客](https://blog.csdn.net/qq_40036754/article/details/102463099)
- [Nginx 安装 SSL 配置 HTTPS 超详细完整教程全过程_./configure --prefix=/usr/local/nginx --with-http__草药哥哥的博客-CSDN博客](https://blog.csdn.net/qq_24604781/article/details/123091156)

:::

`nginx.conf` 文件内容：

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       443 ssl;
        server_name  www.tangjiayan.com;
        error_page 404 /404.html;

        ssl_certificate     /etc/nginx/cert/www.tangjiayan.com.pem;
        ssl_certificate_key  /etc/nginx/cert/www.tangjiayan.com.key;
    
        ssl_session_timeout  5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
    
        location / {
            proxy_pass http://127.0.0.1:5173;
        }
    }

    server {
        listen 80;
        server_name www.tangjiayan.com;
        rewrite ^(.*)$ https://$host$1;
        location / {
            index index.html index.htm;
        }
    }
}
```

配置好 `nginx.conf` 之后，使用 `nginx -s reload` 重新加载，`nginx -t` 测试 `nginx.conf` 文件语法的正确性。

```sh
$ nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## 守护进程 VitePress

参考 [Linux 守护进程的启动方法 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/02/linux-daemon.html)，运行如下命令守护 vitepress 进程:

```sh
nohup npm run docs:dev &
```

使用 `netstat -lntp` 查看端口情况：

```
$ netstat -lntp

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      278838/nginx: maste 
tcp        0      0 127.0.0.1:5173          0.0.0.0:*               LISTEN      531239/node 
```

::: details 为什么不配置指向静态资源

为什么用守护进程的方法，而不是指向静态资源？

答：我试过将 VitePress `/.vitepress/dist` 文件夹上传到服务器，然后设置 `nginx.conf` 的 [location](http://nginx.org/en/docs/http/ngx_http_core_module.html#location) 指向这个文件夹：

```
location / {
     root   /usr/local/www;
     index  index.html index.htm;
}
```

![failed](https://cdn.tangjiayan.com/notes/web-build/vitepress/vitepress-tencent-cloud/failed.png)

结果是提示

```
failed to load module script: expected a javascript module script but the server responded with a mime type of "application/octet-stream". strict mime type checking is enforced for module scripts per html spec.
```

查了半天，没能解决，所以先用反向代理用着了。

:::

## 参考

- [Linux系统安装Nodejs（详细教程）_linux安装nodejs_@Meto的博客-CSDN博客](https://blog.csdn.net/qq_45830276/article/details/126022778)
- [nginx学习，看这一篇就够了_java冯坚持的博客-CSDN博客](https://blog.csdn.net/qq_40036754/article/details/102463099)
- [Beginner’s Guide | nginx.org](http://nginx.org/en/docs/beginners_guide.html)
- [一篇教你博客如何部署到自己的服务器 · Issue #243 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/243)
- [Linux 守护进程的启动方法 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/02/linux-daemon.html)
- [Nginx 安装 SSL 配置 HTTPS 超详细完整教程全过程_./configure --prefix=/usr/local/nginx --with-http__草药哥哥的博客-CSDN博客](https://blog.csdn.net/qq_24604781/article/details/123091156)
