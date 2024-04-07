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
        pattern: "https://github.com/Cerry2022/Cerry2022.github.io/blob/master/docs/src/:path",
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
        text: '惠普计算器',
        collapsed: false,
        items: [
          {
            text: '栏目总说明',
			link: '/hp-calc/hp_calc_info'
          },
          {
            text: 'hp39gii',
            collapsed: true,
            items:[
              { text: '2019-2022 HP39Gii程序日志', link: '/hp-calc/hp39gii/note'},
            ],
          },
		  {
            text: 'hp39gs',
            collapsed: true,
            items:[
              { text: '关于我和Hp39gs', link: '/hp-calc/hp39gs/001'},
            ],
          },
        ]
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
        text: 'MAC',
        // collapsed: true,
        items: [
          {
            text: '配置',
            collapsed: true,
            items:[
              { text: 'Mac下ssh方式配置git', link: 'mac/git.md'},
              { text: 'Mac下安装npm', link: 'mac/npm.md'},
            ],
          },
        ]
      },
      {
        text: '寂静的笔记',
        collapsed: true,
        items: [
          {
            text: 'CPU大杂烩',
			link: '/jijingdebiji/CPU_da_zha_hui'
          },
        ]
      },
      {
        text: `编程资源网`, link: 'https://www.cxypron.com/home',
      },
      {
        text: `CS自学指南`, link: 'https://csdiy.wiki/',
      },
      {
        text: `计算机经典电子书与学习资源`, link: 'https://github.com/GrindGold/pdf',
      },
      {
        text: `华北电力大学计算机系课程攻略`, link: 'https://github.com/IammyselfYBX/NCEPU_CS_course',
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