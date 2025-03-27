---
date: 2024-04-06
title: Mac环境配置npm
category: 主题
tags:
  - "#npm"
  - "#mac"
description: mac环境安装brew并配置npm
---
# MAC下配置npm
1. 打开终端，执行以下命令安装Homebrew
```shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node   //sudo 使用admin权限
安装成功后
node -v:查看node版本
npm -v：查看npm版本
npm -i 
```
2. node升级
```shell
sudo npm install npm@latest -g //升级到最新版
sudo npm install npm@xx -g //升级到指定版本
npm version // 查看版本详情
npm view npm version // npm最新版本
npm view npm versions // npm所有版本
npm list //  插件清单
```