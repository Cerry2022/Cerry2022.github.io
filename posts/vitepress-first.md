---
date: 2021-06-05 00:00
title: vitepress 开始使用
category: 主题
tags:
  - vitepress
  - markdown
description: vitepress的markdown插件支持的语法
modifyDate: 2025-07-25 08:56
---
# vitepress 开始使用
## 前提
理论上任何工具写出来的markdown(下文简称md)文件都能用，但是如果是按照以下方式写的话，可能表现力会丰富很多

## vitepress-markdown

### 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### 提示

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger what??
This is a dangerous warning
:::
```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger what??
This is a dangerous warning
:::

### 代码高亮

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

### emoji表情
```markdown
:tada: :100:
```
:tada: :100:


## 规范与建议

便于效果一致，目前发现页面标题从 ## h2 开始使用可以获得最佳展示效果

## 生产环境的文档

* 上线目前为手动上线 以后可能搞成自动
* 本地全写完也是可以的


