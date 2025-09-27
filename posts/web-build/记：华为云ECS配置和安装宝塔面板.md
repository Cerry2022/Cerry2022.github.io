---
date: 2025-09-28 00:12
modifyDate: 1970-01-01 08:00
title: 记：华为云ECS配置和安装宝塔面板
category:
tags:
description:
---

## 1.服务器配置
最小规格即可
```c
    基础配置
        计费模式: 按需计费
        区域/可用区: 拉美-墨西哥城二 | 随机分配 

    实例
        规格: 通用入门型 | t6.small.1 | 1vCPUs | 1GiB 

    操作系统
        镜像: Huawei Cloud EulerOS 2.0 标准版 64位
        主机安全: 已开启基础防护
        免费一个月

    存储与备份
        系统盘: 通用型SSD, 10GiB 

    网络
        虚拟私有云: vpc-default(192.168.0.0/16)
        主网卡: subnet-default(192.168.0.0/24)
        源/目的检查: 开启

    安全组
        Sys-WebServer

    公网访问
        弹性公网IP: 暂不购买 

    云服务器管理
        云服务器名称: new-api-2
        登录凭证: 密码
        标签: --

    高级配置
        云监控: 已开启详细监控
        免费

    购买量
        定时删除时间: --
        购买数量: 1 
```

## 2.安装宝塔
复制ecs的服务器ip
![[posts/files/Pasted image 20250928002225.png]]
使用ssh登录root账户，输入购买服务器时设置的登录凭证
```shell
cerry@ROG-Flow-X13 ~> ssh root@101.44.24.107
```

参考华为云文档 [手工部署宝塔面板](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0178996061.html)
```shell
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh
```
当出现以下提示信息时，输入“y”：
```shell
...
Do you want to install Bt-Panel to the /www directory now?(y/n): y
...
```
直到安装成功显示账号及密码
![[posts/files/Pasted image 20250928002713.png]]
前往安全组配置 14484端口开放
![[posts/files/Pasted image 20250928002755.png]]

## 3.配置宝塔
面板中安装docker, 搜索New-API并安装
![[posts/files/Pasted image 20250928003014.png]]

安装成功后使用http打开
http://101.44.24.107:3000/
配置初始化
![[posts/files/Pasted image 20250928003446.png]]

## 4.**开始使用！！！**
![[posts/files/Pasted image 20250928003542.png]]