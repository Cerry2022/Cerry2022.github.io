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
  title: "糖加盐的学习笔记",
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
        pattern: "https://github.com/tangjan/tangjan.github.io/edit/main/docs/:path",
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
        text: '未分类',
        items: [
          { text: '未分类',
            collapsed: true,
            items: [
              { text: '向 Hyper-V 虚拟机中传输文件', link: '/unclassified/hyper-v/transfer-files-to-vm' },
              { text: 'Bitvise Access Denied 问题', link: '/unclassified/bitvise-access-denied'},
            ]
          },
          { text: 'Git',
            collapsed: true,
            items: [
              { text: 'Git / GitHub 的基本使用', link: '/unclassified/git/git-github' },
              { text: 'GitHub Connection timed out 问题', link: '/unclassified/git/connection-timed-out'},
            ]
          },
          { text: 'Linux',
            collapsed: true,
            items: [
              { text: '常见命令的全称', link: '/unclassified/linux/full-name' },
              { text: '用户管理', link: '/unclassified/linux/user' }
            ]
          },
          { text: 'PhotoShop',
            collapsed: true,
            items: [
              { text: '仿制图章工具', link: '/unclassified/photoshop/clone-stamp' },
            ]
          },
          { text: '本科',
            collapsed: true,
            items: [
              { text: '基于 Simulink 的 SVPWM 仿真', link: '/unclassified/undergraduate/simulink-svpwm' },
              { text: 'MATLAB 拼图游戏设计', link: '/unclassified/undergraduate/matlab-jigsaw' },
              { text: '基于机器视觉 YOLO 目标检测算法的绝缘子及缺陷识别', link: '/unclassified/undergraduate/yolo-insulator' },
            ]
          },
        ],
      },
      {
        text: '建站',
        // collapsed: true,
        items: [
          {
            text: '建站',
            collapsed: true,
            items: [
              { text: '仿豆瓣主页静态页面', link: '/web-build/fake-douban'},
              { text: 'Windows 本地 Wordpress CMS 搭建', link: '/web-build/wordpress/windows-local-wordpress'},
              { text: 'CAA 类型解析记录会影响 SSL 证书的申请', link: '/web-build/caa-ssl'},
              { text: 'XAMPP - phpmyadmin：Error establishing a database connection', link: '/web-build/debug/Error-establishing-a-database-connection'},
              { text: 'url', link: '/web-build/url'},
              { text: 'jekyll 个人在线简历', link: '/web-build/jekyll-cv.md'},
              { text: 'WebStackPage 个人导航站', link: '/web-build/webstackpage.md'},
            ]
          },
          {
            text: 'CSS',
            collapsed: true,
            items:[
              { text: 'linear-gradient 渐变色', link: '/web-build/css/linear-gradient-tangjiayan'},
            ],
          },
          {
            text: 'HTML',
            collapsed: true,
            items:[
              { text: 'HTML 注音元素 &lt;ruby&gt;', link: '/web-build/html/ruby'},
            ],
          },
          {
            text: 'JS',
            collapsed: true,
            items:[
              { text: 'JavaScript 初探——猜数字小游戏', link: '/web-build/js/js-number-guessing'},
              { text: '将 url 中的 query 字段显示在网页中', link: '/web-build/js/query-display'},
            ],
          },
          {
            text: 'Markdown',
            collapsed: true,
            items:[
              { text: 'GitHub-Style Table', link: '/web-build/markdown/github-style-table'},
            ],
          },
          {
            text: 'Typecho',
            collapsed: true,
            items:[
              { text: 'Debian 10 部署 Typecho', link: '/web-build/typecho/debian10-typecho'},
              { text: 'Typecho首页文章没排满就换页', link: '/web-build/typecho/typecho-page-change'},
            ],
          },
          {
            text: 'VitePress',
            collapsed: true,
            items:[
              {
                text: 'debug',
                collapsed: true,
                items:[
                  { text: 'spawn-git-ENOENT', link: '/web-build/vitepress/debug/spawn-git-ENOENT'},
                  { text: 'Error: listen EACCES', link: '/web-build/vitepress/debug/listen-EACCES'},
                  { text: 'ERR_TTY_INIT_FAILED', link: '/web-build/vitepress/debug/ERR_TTY_INIT_FAILED'},
                ]
              },
              { text: 'VitePress 部署到 Github Pages', link: '/web-build/vitepress/vitepress-github-pages'},
              { text: 'Nginx 反向代理实现 VitePress 站点部署到腾讯云服务器', link: '/web-build/vitepress/vitepress-tencent-cloud'},
              { text: 'VitePress 中使用 Katex', link: '/web-build/vitepress/vitepress-katex'},
            ],
          },
          {
            text: 'WordPress',
            collapsed: true,
            items:[
              { text: 'Windows 本地 Wordpress CMS 搭建', link: '/web-build/wordpress/windows-local-wordpress'},
            ],
          },
        ]
      },
      {
        text: '编程',
        items: [
          {
            text: 'C++',
            collapsed: true,
            items: [
              {
                items: [
                  {
                    text: '输入/输出数据',
                    collapsed: true,
                    items: [
                      { text: 'cin / cout', link: '/programming/c++/input-output/cin-cout'},
                      { text: 'getline', link: '/programming/c++/input-output/getline'}
                    ]
                  },
                  {
                    text: '容器',
                    collapsed: true,
                    items: [
                      { text: 'array', link: '/programming/c++/containers/array'}
                    ]
                  },
                  {
                    text: 'debug',
                    collapsed: true,
                    items: [
                      { text: '牛客 Do not declare C-style arrays, use std::array<> instead', link: '/programming/c++/debug/nowcoder-use-stdarray-instead'}
                    ]
                  },
                  { text: '格式说明符', link: '/programming/c++/format-specifier'},
                ]
              }
            ]
          },
          {
            text: 'VS Code',
            collapsed: true,
            items: [
              { text: 'VS Code 配置 C++ 运行环境', link: '/programming/vscode/vscode-cpp' },
              { text: '使用 VS Code 进行 git commit 一直加载', link: '/programming/vscode/commit-stuck' },
              { text: 'VS Code 插件 markdownlint 提示 “no-hard-tabs”', link: '/programming/vscode/vscode-hard-tab'},
            ]
          },
        ]
      },
      {
        text: '日语',
        items:[
          {
            text: '五十音',
            collapsed: true,
            items: [
              { text: '五十音图', link: '/japanese/gojuon/gojuon'},
              { text: '五十音图-易混淆标色版', link: '/japanese/gojuon/confusing-gojuon'},
              { text: '五十音笔顺', link: '/japanese/gojuon/gojuon-stroke-order'},
              { text: '浊音/半浊音', link: '/japanese/gojuon/voiced'},
            ] 
          }
        ]
      },
      {
        text: '嵌入式',
        items:[
          {
            text: '嵌入式',
            collapsed: true,
            items: [
              { text: 'STM32 命名规则', link: '/embeded/stm32-naming-rule'},
              { text: 'STM32 点灯大师', link: '/embeded/stm32-light'},
              { text: 'STM32 点灯大大师', link: '/embeded/stm32-blink'},
            ]
          }
        ]
      },
      {
        text: 'ANTI',
        items:[
          { 
            text: 'ANTI',
            collapsed: true,
            items:[
              { text: 'ANTI 是什么', link: '/anti/whats-anti'},
              { text: '重装 v2ray - WS + TLS + Web + CloudFlare', link: '/anti/reinstall-v2ray' }
            ]
          
          }
        ]
      },
      {
        text: `www.tangjiayan.cn`, link: 'https://www.tangjiayan.cn',
      },
      {
        text: '旧笔记站', link: 'https://old-notes.tangjiayan.cn',
      },
      {
        text: `CC BY-NC-SA 4.0`, link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
    ],
  }
})

