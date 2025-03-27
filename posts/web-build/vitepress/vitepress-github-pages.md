---
date: 2021-06-30
title: 使用 VitePress 搭建文档站点
category: 主题
tags:
  - "vitepress"
description: 使用 VitePress 搭建文档站点
---
# 使用 VitePress 搭建文档站点

`VitePress`是`Vue`团队提供的一个基于`Vue 3`与`Vite`的开源框架，通过`MarkDown`文档和简单配置就能快速生成静态文档站点。与基于`WebPack`的`VuePress`相比，`VitePress`拥有更快的启动和打包速度

除了支持标准和扩展的`md`语法外，`VitePress`还支持在`md`文档内书写`Vue`语法，非常适合前端组件库文档或普通技术文档的搭建

::: info
如果不想了解完整的使用方式，也可以直接克隆本站仓库后修改使用

```shell
git clone https://github.com/Cerry2022/Cerry2022.github.io.git
```

:::

## 一、创建项目

::: tip 环境要求
要求设备已安装 [Node 18+](https://nodejs.org/zh-cn/) 、[Git](https://git-scm.com/) 环境，推荐使用 [NVM](https://github.com/coreybutler/nvm-windows) 、 [Volta](https://docs.volta.sh/guide/) 或 [FVM](https://fvm.app/docs/getting_started/overview)更方便的管理 Node 版本
:::

在终端目标路径下运行：

```shell
mkdir projectName

cd projectName

pnpm init

pnpm i -D vitepress
```

::: tip 提示
相比于 npm 或 yarn，更推荐使用 pnpm，如果没有需要自行安装

因为 vitepress 仅支持 ESM 模块化，所以还需要在 package.json 中添加 type 属性，如果项目中有用到 CommonJS 模块化的脚本，则需要显示指定文件扩展名为 `.cjs`

如果使用 pnpm 报`missing peer`的错误，则还需要添加 pnpm 属性

```json
// package.json
// ...
"type": "module",
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```

如果需要用到 Vue 相关功能，还需要显示的安装 Vue：`pnpm i vue`
:::

## 二、创建文档

vitepress 提供了 init 命令来运行安装向导，在终端中运行`npx vitepress init`并按向导执行后可以得到一个基础模板

向导会生成一个 .vitepress 文件夹，三个示例 md 文件， .gitignore 文件以及在 package.json 中添加了三个 scripts 命令

VitePress 使用文件路径作为路由地址，如果路径是`/a/b.md`，访问路径就是`http://localhost:5173/a/b.html`

根目录下的 index.md 会作为文档首页，同理如果子目录下的文件名是 index.md ，也可以省略访问路径最后的`/index.html`，例如路径是`/a/index.md`，可以通过`http://localhost:5173/a`访问

生成的`docs:dev`、`docs:build`、`docs:preview`命令分别对应本地运行，打包和预览打包文件（会启动一个本地服务）。vitepress 默认将根目录作为工作目录，如果想修改工作目录例如将 docs 作为工作目录，可以修改 scripts 命令为`vitepress dev docs`（build、preview 也需要修改）

## 三、部署 GitHub Pages

`GitHub Pages`是`GitHub`提供的一个静态站点服务，可以方便的将我们的文档部署到`GitHub`服务器上，并提供外网访问地址

1. 首先需要在 Github 中创建项目仓库，并上传代码

2. 在项目根目录下创建 `.github/workflows/deploy.yml` 文件（yml 文件名可以任意取，所有 workflow 下的 yml 文件均会自动执行），内容为：

```yml
# name名称可以任意取
name: 部署到GithubPages

on:
  # 执行 'push' 到 'master' 时触发，根据自己仓库的分支名修改
  push:
    branches: [master]

  # 允许从“操作”选项卡手动运行此工作流
  workflow_dispatch:

# 设置GITHUB_TOKEN的权限
permissions:
  contents: read
  pages: write
  id-token: write

# 设置属于'pages'组下的工作流并发，设置后只运行首个和最新的工作流，中间等待状态的工作流将被取消
concurrency:
  group: pages
  # 取消首个工作流的运行，这样在并发时就只会运行最新的
  cancel-in-progress: true

jobs:
  # 打包流程
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码到打包环境中
        uses: actions/checkout@v3
        with:
          # 获取全部提交记录，如果未启用lastUpdated，则不需要
          fetch-depth: 0
      - name: 安装PNPM
        uses: pnpm/action-setup@v2
      - name: 安装Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - name: 启用Github Pages并读取文档元数据
        uses: actions/configure-pages@v3
      - name: 安装依赖
        run: pnpm install
      - name: 打包
        run: pnpm build
      - name: 上传项目
        uses: actions/upload-pages-artifact@v2
        with:
          path: .vitepress/dist

  # 部署流程
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

3. 在项目仓库中修改 `Settings -> Pages -> Source` 为 GitHub Actions

4. 完成上诉操作后每次提交到主分支便会触发工作流，将最新代码部署到 Github Pages 中