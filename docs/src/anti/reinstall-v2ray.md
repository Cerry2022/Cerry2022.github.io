# 重装 v2ray - WS + TLS + Web + CloudFlare

## 序

2023/8/30，今天翻墙服务器突然就没用了。

首先在 [ping.pe](https://ping.pe/) 确认一下是不是我的服务器 IP 地址被墙了：

![ping.be](https://cdn.tangjiayan.com/reinstall-v2ray/1-ping.be.png)

我是江苏电信网络，从图中可以看到，`Jiangsu China Telecom` 的丢包率是 `15%`，还算正常。因此问题出在我的服务器或客户端上。

尝试了以下方案，都没有用：

- 更新服务器端、更新客户端
- 更换服务器端 v2ray 端口
- 重设 服务器时间（v2ray 要求服务器和客户端时间差绝对值不能超过 90 秒，参见 <a href="https://guide.v2fly.org/prep/start.html#%E6%97%B6%E9%97%B4%E6%98%AF%E5%90%A6%E5%87%86%E7%A1%AE" target="_blank" rel="noopener">这里</a>）

所以干脆重装一下 v2ray 吧。

根据 <a href="https://github.com/v2fly/v2ray-examples/tree/master/how-to-choose#%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9-v2ray-%E6%96%B9%E6%A1%88">如何选择 v2ray 方案</a> 考虑了一下，决定采用 `Nginx` + `TLS` + `WS`。于是主要参考 [V2Ray (WebSocket + TLS + Web + Cloudflare) 手动配置详细说明 - Eric](https://ericclose.github.io/V2Ray-TLS-WebSocket-Nginx-with-Cloudflare.html) 重装了一下 v2ray。

本文略去了：

- 服务器购买及 SSH 连接
- 域名购买注册

## 重装服务器系统为 Debian 10

首先更新一下系统，我的服务器系统是 `CentOS 7.9.2009`，有点旧了。

```bash
$ cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```

我的服务器是在 [RackNerd](https://www.racknerd.com/) 买的，在 RackNerd 服务器管理界面进入 `Control Panel`（登入Control Panel 的初始账号密码在购买服务器时发送到了注册邮箱），将服务器系统重置为 `Debian 10`。

![reinstall-Debian](https://cdn.tangjiayan.com/reinstall-v2ray/2-reinstall-Debian.png)

## v2ray 安装前准备及安装

以下过程均是以 `root` 身份运行的。

最好不要这样，因为一旦手滑 `rm -rf /*` 就不好了。所以最好用非 root 用户，通过 `sudo` 执行 root 指令。

### 更新 apt、安装 curl

重装好系统后，先更新一下 [apt](https://en.wikipedia.org/wiki/APT_(software))，安装 [curl](https://en.wikipedia.org/wiki/CURL)

```sh
apt-get --allow-releaseinfo-change update
```

```sh
apt-get dist-upgrade
```

```sh
apt-get install curl -y
```

### 校正系统时间

v2ray 要求服务器和客户端时间差绝对值不能超过90 秒，参见 <a href="https://guide.v2fly.org/prep/start.html#%E6%97%B6%E9%97%B4%E6%98%AF%E5%90%A6%E5%87%86%E7%A1%AE" target="_blank" rel="noopener">这里</a>

```sh
timedatectl list-timezones | grep Shanghai
```

```sh
timedatectl set-timezone Asia/Shanghai
```

```sh
date -R
```

### 安装 ufw

```sh
apt install ufw
ufw enable
ufw allow 'OpenSSH'
```

### 安装 v2ray

通过 [fhs-install-v2ray](https://github.com/v2fly/fhs-install-v2ray) 安装 v2ray。

```sh
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

![instal-v2ray](https://cdn.tangjiayan.com/reinstall-v2ray/3-instal-v2ray.png)

根据安装完成后的提示，顺便运行一下：

```sh
apt purge curl unzip
```

接下来的步骤我用 [Xshell for home/school](https://www.netsarang.com/en/free-for-home-school/) 作为 [CLI](https://en.wikipedia.org/wiki/Command-line_interface)，用 <a href="https://www.bitvise.com/">Bitvise</a> 进行 [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) 文件修改、传输。

## 配置 v2ray

配置 `/usr/local/etc/v2ray/config.json`，内容如下

::: details config.json

```json
{
    "log":{
        "loglevel":"warning"
    },
    "routing":{
        "domainStrategy":"AsIs",
        "rules":[
            {
                "type":"field",
                "ip":[
                    "geoip:private"
                ],
                "outboundTag":"block"
            }
        ]
    },
    "inbounds":[
        {
            "listen":"127.0.0.1",
            "port":<端口>,
            "protocol":"vmess",
            "settings":{
                "clients":[
                    {
                        "id":<uuid>,
                        "alterId":0
                    }
                ]
            },
            "streamSettings":{
                "network":"ws",
                "wsSettings":{
                    "path": <path>
                }
            }
        }
    ],
    "outbounds":[
        {
            "protocol":"freedom",
            "tag":"direct"
        },
        {
            "protocol":"blackhole",
            "tag":"block"
        }
    ]
}
```

:::

其中：

- `<端口>`：自定
- `<uuid>`：可通过 [UUID 生成器](https://www.v2fly.org/awesome/tools.html#%E5%9C%A8%E7%BA%BF%E5%B7%A5%E5%85%B7) 或 [Online UUID Generator](https://www.uuidgenerator.net/) 生成
- `<path>`：自定

`<uuid>` 和 `<path>` 记得用 `英文引号` 括起来。

## CloudFlare 域名解析

CloudFlare 接管了域名解析之后，在 CloudFlare 添加以下两条 DNS 记录：

<font color="#d56d28">

| Type |   Name  |  IPv4 address | Proxy statis|
| :--: | :-----: |      :----:   |    :----:   |
|  A   |    @    |      x.x.x.x  | ☁ Proxied  |
|  A   |    www  |     x.x.x.x   | ☁ Proxied  |

</font>

## 安装 Nginx 及其初始配置

参考 [安装 Nginx 及其初始配置](https://ericclose.github.io/V2Ray-TLS-WebSocket-Nginx-with-Cloudflare.html#%E5%AE%89%E8%A3%85-Nginx-%E5%8F%8A%E5%85%B6%E5%88%9D%E5%A7%8B%E9%85%8D%E7%BD%AE)

## CloudFlare 生成 TLS 证书、部署 Authenticated Origin Pulls

### TLS 证书及私钥

`CloudFlare 仪表盘` → `SSL/TLS` → `Origin Server` → `Create Certificate`

因为「The private key data will not be stored at Cloudflare and will no longer be accessible once the creation is complete」，所以要保存好。

![Cloudflare-TLS-Generate](https://cdn.tangjiayan.com/reinstall-v2ray/5-Cloudflare-TLS-Generate.png)

把证书和私钥都保存在 `/etc/ssl/cloudflare` 内。

### Authenticated Origin Pulls

>When you enable Authenticated Origin Pulls for a zone, all proxied traffic to your zone is authenticated at the origin web server.
—— <a href="https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/#zone-level-authenticated-origin-pulls">Zone-level authenticated origin pulls · Cloudflare SSL/TLS docs</a>

也就是说，如果在 Nginx 服务器上设置了 `Authenticated Origin Pulls`，就可以确保它只接受来自 Cloudflare 服务器的请求，防止任何其他人直接连接到 Nginx 服务器。

复制 `authenticated_origin_pull_ca.pem` 证书的内容，同样放在 `/etc/ssl/cloudflare` 内。

::: details authenticated_origin_pull_ca.pem

```
-----BEGIN CERTIFICATE-----
MIIGCjCCA/KgAwIBAgIIV5G6lVbCLmEwDQYJKoZIhvcNAQENBQAwgZAxCzAJBgNV
BAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMRQwEgYDVQQLEwtPcmln
aW4gUHVsbDEWMBQGA1UEBxMNU2FuIEZyYW5jaXNjbzETMBEGA1UECBMKQ2FsaWZv
cm5pYTEjMCEGA1UEAxMab3JpZ2luLXB1bGwuY2xvdWRmbGFyZS5uZXQwHhcNMTkx
MDEwMTg0NTAwWhcNMjkxMTAxMTcwMDAwWjCBkDELMAkGA1UEBhMCVVMxGTAXBgNV
BAoTEENsb3VkRmxhcmUsIEluYy4xFDASBgNVBAsTC09yaWdpbiBQdWxsMRYwFAYD
VQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlhMSMwIQYDVQQD
ExpvcmlnaW4tcHVsbC5jbG91ZGZsYXJlLm5ldDCCAiIwDQYJKoZIhvcNAQEBBQAD
ggIPADCCAgoCggIBAN2y2zojYfl0bKfhp0AJBFeV+jQqbCw3sHmvEPwLmqDLqynI
42tZXR5y914ZB9ZrwbL/K5O46exd/LujJnV2b3dzcx5rtiQzso0xzljqbnbQT20e
ihx/WrF4OkZKydZzsdaJsWAPuplDH5P7J82q3re88jQdgE5hqjqFZ3clCG7lxoBw
hLaazm3NJJlUfzdk97ouRvnFGAuXd5cQVx8jYOOeU60sWqmMe4QHdOvpqB91bJoY
QSKVFjUgHeTpN8tNpKJfb9LIn3pun3bC9NKNHtRKMNX3Kl/sAPq7q/AlndvA2Kw3
Dkum2mHQUGdzVHqcOgea9BGjLK2h7SuX93zTWL02u799dr6Xkrad/WShHchfjjRn
aL35niJUDr02YJtPgxWObsrfOU63B8juLUphW/4BOjjJyAG5l9j1//aUGEi/sEe5
lqVv0P78QrxoxR+MMXiJwQab5FB8TG/ac6mRHgF9CmkX90uaRh+OC07XjTdfSKGR
PpM9hB2ZhLol/nf8qmoLdoD5HvODZuKu2+muKeVHXgw2/A6wM7OwrinxZiyBk5Hh
CvaADH7PZpU6z/zv5NU5HSvXiKtCzFuDu4/Zfi34RfHXeCUfHAb4KfNRXJwMsxUa
+4ZpSAX2G6RnGU5meuXpU5/V+DQJp/e69XyyY6RXDoMywaEFlIlXBqjRRA2pAgMB
AAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgECMB0GA1Ud
DgQWBBRDWUsraYuA4REzalfNVzjann3F6zAfBgNVHSMEGDAWgBRDWUsraYuA4REz
alfNVzjann3F6zANBgkqhkiG9w0BAQ0FAAOCAgEAkQ+T9nqcSlAuW/90DeYmQOW1
QhqOor5psBEGvxbNGV2hdLJY8h6QUq48BCevcMChg/L1CkznBNI40i3/6heDn3IS
zVEwXKf34pPFCACWVMZxbQjkNRTiH8iRur9EsaNQ5oXCPJkhwg2+IFyoPAAYURoX
VcI9SCDUa45clmYHJ/XYwV1icGVI8/9b2JUqklnOTa5tugwIUi5sTfipNcJXHhgz
6BKYDl0/UP0lLKbsUETXeTGDiDpxZYIgbcFrRDDkHC6BSvdWVEiH5b9mH2BON60z
0O0j8EEKTwi9jnafVtZQXP/D8yoVowdFDjXcKkOPF/1gIh9qrFR6GdoPVgB3SkLc
5ulBqZaCHm563jsvWb/kXJnlFxW+1bsO9BDD6DweBcGdNurgmH625wBXksSdD7y/
fakk8DagjbjKShYlPEFOAqEcliwjF45eabL0t27MJV61O/jHzHL3dknXeE4BDa2j
bA+JbyJeUMtU7KMsxvx82RmhqBEJJDBCJ3scVptvhDMRrtqDBW5JShxoAOcpFQGm
iYWicn46nPDjgTU0bX1ZPpTpryXbvciVL5RkVBuyX2ntcOLDPlZWgxZCBp96x07F
AnOzKgZk4RzZPNAxCXERVxajn/FLcOhglVAKo5H0ac+AitlQ0ip55D2/mf8o72tM
fVQ6VpyjEXdiIXWUq/o=
-----END CERTIFICATE-----
```

:::

![save-the-TLS](https://cdn.tangjiayan.com/reinstall-v2ray/cloudflare-tls-auth.png)

## Nginx 证书和密钥、反向代理的配置

参考 [Nginx 证书和密钥、反向代理的配置](https://ericclose.github.io/V2Ray-TLS-WebSocket-Nginx-with-Cloudflare.html#Nginx-%E8%AF%81%E4%B9%A6%E5%92%8C%E5%AF%86%E9%92%A5%E3%80%81%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E7%9A%84%E9%85%8D%E7%BD%AE) 。

对于本文需要注意的是，我在上文把 CloudFlare 的证书都放在了 `/etc/ssl/cloudflare` 下，因此 `ssl_certificate`、`ssl_certificate_key`、`ssl_client_certificate` 需要对应修改。

## 后续步骤

后续步骤：

- 自启并启动相关服务
- TCP BBR
- v2rayN 客户端配置
- 优选 CloudFlare CDN 节点 IP

参考 [V2Ray (WebSocket + TLS + Web + Cloudflare) 手动配置详细说明 - Eric](https://ericclose.github.io/V2Ray-TLS-WebSocket-Nginx-with-Cloudflare.html#%E8%87%AA%E5%90%AF%E5%B9%B6%E5%90%AF%E5%8A%A8%E7%9B%B8%E5%85%B3%E6%9C%8D%E5%8A%A1)

## 参考

- [V2Ray (WebSocket + TLS + Web + Cloudflare) 手动配置详细说明 - Eric](https://ericclose.github.io/V2Ray-TLS-WebSocket-Nginx-with-Cloudflare.html)
- [Debian apt更新失败处理方法 – 幽静森林](https://www.ddddl.com/archives/1648/debian-apt%E6%9B%B4%E6%96%B0%E5%A4%B1%E8%B4%A5%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95/)
- [V2Ray 配置指南 | 新 V2Ray 白话文指南](https://guide.v2fly.org/)
