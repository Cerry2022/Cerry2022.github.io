---
date: 2025-07-24 16:49
modifyDate: 2025-07-25 08:02
title: wsl下NAT网络使用默认主机地址无法访问网络修复
category: 
tags:
  - wsl
description:
---

## 起因
一开始是这样的,网卡正常,ip地址也有,dns地址通过宿主机地址获取
![[posts/files/Pasted image 20250724163800.png]]

![[posts/files/Pasted image 20250724163702.png]]

但是ping不上baidu.com,即便是ping 172.26.144.1 也不行
尝试卸载 虚拟网卡驱动 Hyper-V Virtual Ethernet Adapter 然后再打开 也不行
hyper 管理工具内修改也不行
修改 .wslconfig 为各种网络模式也不行

## 解决办法
1. 删除 .wslconfig 内多余的配置,保持最简单的比如内核内存的配置.
2. 在程序->启动或关闭Windwos功能->关闭 `适用于Linux 的Windows子系统` 以及  `Hyper-V`,然后重启系统,然后打开适用于Linux 的Windows子系统(*可以不开启Hyper-V,WSL并不直接依赖这个,虽然底层也是Hyper-V*),再次重启系统.
3. 最后打开wsl,即可连上网络 .


resolv.conf 内自动生成的配置,就是 WSL虚拟网卡 配置 的IPv4地址
![[posts/files/Pasted image 20250724164648.png]]


![[posts/files/Pasted image 20250724164445.png]]