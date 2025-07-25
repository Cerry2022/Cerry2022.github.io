---
date: 2025-05-13 10:37
modifyDate: 2025-07-25 08:37
---
# Cerry\`blog
## 介绍
这是我的个人博客,使用`vitepress-blog-pure`主题

[vitepress-blog-pure主题 项目主页](https://github.com/airene/vitepress-blog-pure)
## changelog
[changelog](./changelog2.md)
[changelog2](./changelog2.md)
## 使用方法

1.复制以下文件到你的项目根目录

```
├── .vitepress
├── pages
│   ├── about.md
│   ├── archives.md
│   └── tags.md
├── posts            //存放博客文章
├── public           //[可选]
    └── favicon.ico
```

2.新建一个 package.json 文件,执行 npm i,包信息自己看着调整

```json
{
    "name": "vitepress-blog-pure",
    "version": "1.0.0",
    "description": "",
    "main": "index.ts",
    "scripts": {
        "dev": "vitepress dev --host 0.0.0.0",
        "build": "vitepress build",
        "preview": "vitepress preview"
    },
    "keywords": [],
    "author": "",
    "type": "module",
    "license": "ISC",
    "devDependencies": {
        "vitepress": "^1.6.3",
        "globby": "^14.1.0",
        "gray-matter": "^4.0.3",
        "fs-extra": "^11.3.0",
        "vitepress-plugin-comment-with-giscus": "^1.1.15"
    }
}
```
3.修改 `.vitepress/config.ts` 中的基本配置信息（站点名称，评论仓库信息）  
4.执行 `npm run dev` 即可查看效果, 其他工具随意 pnpm,yarn,bun 等

**ps. 写文章的格式和位置**  
推荐放到 posts 目录中，格式：

```markdown
---
date: 2021-06-30
title: .zsh_history历史记录优化
description: 历史重复的命令太多了，不用grep都不太好找
tags:
    - macOS
---

# .zsh_history历史记录优化  -- 用{{ $frontmatter.title }}会影响本地查询，可惜
正文
```

**其中 title 为必须有的内容，其他随意，推荐含有 date,不然会默认一个当前时间，推荐含有 tags，这样也可以在标签页面显示**

## 感谢

其实没怎么写过 nodejs,从掘金看到的一篇文章带来的灵感 - [VitePress 极简博客搭建](https://juejin.cn/post/6896382276389732359)

[Moking1997](https://github.com/Moking1997) 开发的比较早，vitepress 的版本还是 0.7.x,现在已经 0.15.x 了，变化还是挺大的，已经不太能通过提 pr 的方式维护了。  
主要的变化是适配 vitepress 的新版本，主题这块采用的实现思路不一样，并不改动官方默认主题，这样可以实现极少的代码量和为将来能发布成 npm 主题包的做准备。

比如：  
sidebar 使用 hackcss 的方式实现想要的效果

[Albert26193](https://github.com/Albert26193) 第一个给本project 提pull request的人，虽然没直接合进来，还是感谢。  
[InsHomePgup](https://github.com/InsHomePgup)  
[FisherMS](https://github.com/FisherMS)  

## License

[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2021-present, Airene
