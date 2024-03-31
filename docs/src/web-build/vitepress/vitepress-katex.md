---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---

# VitePress 中使用 Katex

## 效果

### Maxwell's Equations

equation | description
----------|------------
$\nabla \cdot \vec{\mathbf{B}}  = 0$ | divergence of $\vec{\mathbf{B}}$ is zero
$\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$ |  curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$
$\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_

## 步骤

1. `npm install markdown-it-katex`

::: details All versions of `markdown-it-katex` are vulnerable to XSS
运行 `npm install markdown-it-katex` 时出现提示：

```
$ npm install markdown-it-katex

up to date, audited 78 packages in 2s

10 packages are looking for funding
  run `npm fund` for details

1 high severity vulnerability

Some issues need review, and may require choosing a different dependency.

Run `npm audit` for details.
```

根据提示，执行 `npm audit`：

```
$ npm audit
# npm audit report

markdown-it-katex  *
Severity: high
Cross-Site Scripting in markdown-it-katex - https://github.com/advisories/GHSA-5ff8-jcf9-fw62
No fix available
node_modules/markdown-it-katex

1 high severity vulnerability

Some issues need review, and may require choosing a different dependency.
```

根据提示中的 [https://github.com/advisories/GHSA-5ff8-jcf9-fw62](https://github.com/advisories/GHSA-5ff8-jcf9-fw62)：

> All versions of `markdown-it-katex` are vulnerable to Cross-Site Scripting (XSS). The package fails to properly escape error messages, which may allow attackers to execute arbitrary JavaScript in a victim's browser by triggering an error.

也就是说使用 `markdown-it-katex` 这个插件会使得网站容易受到 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击，要注意这个问题。

:::

2. 在 `.vitepress/config.mts` 文件中，加上：

::: details 要加在 `.vitepress/config.mts` 的 `markdown-it-katex` 相关内容

```js
import markdownItKatex from 'markdown-it-katex'
const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  }
})

```

:::

3. 在 `.md` 文件开头引入 Katex 的 css 文件

```md
---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
```

## 参考

- [KaTeX/MathJax implementation · Issue #529 · vuejs/vitepress](https://github.com/vuejs/vitepress/issues/529#issuecomment-1151186631)
- [waylonflinn/markdown-it-katex: Add Math to your Markdown with a KaTeX plugin for Markdown-it](https://github.com/waylonflinn/markdown-it-katex)
- [VitePress开发记录（二）之LaTeX语法支持_凌晨三点的修狗的博客-CSDN博客](https://blog.csdn.net/weixin_43837483/article/details/132517579)
