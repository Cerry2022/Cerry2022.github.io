import { defineConfig } from 'vitepress'
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cerry的学习笔记",
  description: "Jan Tang",
  head: [['link', { rel: 'icon', href: 'https://cdn.tangjiayan.com/logo.svg' }]],
  lang: 'zh-CN',
  lastUpdated: true,
  srcDir: './src',

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
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // nav: [
    //   // { text: '主页', link: '/' },
    //   // { text: '学习笔记', link: '/markdown-examples' }
    // ],

    editLink: {
        pattern: "https://github.com/Cerry2022/Cerry2022.github.io/blob/master/docs/:path",
        text: "在 GitHub 上编辑此页面",

    },

    lastUpdatedText: "最后更新于",

    logo: 'https://cdn.tangjiayan.com/logo.svg',

    // footer:{
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },
    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangjan' }
    ],

    sidebar: [
      {
        text: 'WELCOME',
        link: '/index.md'
      },
      {
        text: '更新日志',
        link: '/update-log'
      },
      {
        text: '建站',
        // collapsed: true,
        items: [
          {
            text: 'VitePress',
            collapsed: true,
            items:[
              { text: 'VitePress 部署到 Github Pages', link: '/web-build/vitepress/vitepress-github-pages'},
            ],
          },
        ]
      },
      {
        text: '寂静的笔记',
        // collapsed: true,
        items: [
          {
            text: 'VitePress',
			link: '/jijingdebiji/CPU_da_zha_hui'
          },
        ]
      },
      {
        text: `www.tangjiayan.cn`, link: 'https://www.tangjiayan.cn',
      },
      {
        text: `CC BY-NC-SA 4.0`, link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
    ],
  }
})

