---
date: 2024-09-27
title: 记一次win11安装WSL2及Debian的配置
category: 主题
tags:
  - win
  - debian
  - wsl
description: win11安装WSL2并配置Debian
---
- 环境：
	- 开启Hyper-V 控制面板->程序->添加或关闭功能
	- 设置wsl版本 `wsl --set-default-version 2`
	- 确保WSL2核心安装 [WSL2核心升级包](https://link.zhihu.com/?target=https%3A//wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
- 换源：

	换源脚本 bash <(curl -sSL https://linuxmirrors.cn/main.sh)
	- `sudo vi /etc/apt/sources.list`
		1. 按esc键，进入普通模式
		2. 按gg键，光标移到首行
		3. 按v或V键，进入可视模式
		4. 按G键，光标移到最后一行，选中整个文件内容
		5. 按d键，删除选中的内容
	- `sudo apt update -y`
	- `sudo apt install apt-transport-https ca-certificates`
	- `sudo apt update -y && sudo apt upgrade -y`
- 设置中文
	1. 安装语言包
     `sudo apt-get -y install locales xfonts-intl-chinese fonts-wqy-microhei`
	2. 语言环境设置
     `sudo dpkg-reconfigure locales`

## 附加脚本
-  win11家庭版 开启Hyper-V功能
- 以下脚本保存为bat文件，管理员身份运行
```shell
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
pause
```
## 外部链接
- 可参考 [Windows系统通过WSL2安装Ubuntu22.04系统及图形化界面_wsl2 ubuntu 图形界面-CSDN博客](https://blog.csdn.net/fysuccess/article/details/141646840#:~:text=WSL%E6%8F%90%E4%BE%9B%E4%BA%86%E4%B8%80%E4%B8%AA%E5%BE%AE%E8%BD%AF)
