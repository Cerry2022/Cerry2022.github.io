import { defineConfig } from 'vitepress'

// 导入生成配置工具方法
import { getThemeConfig } from '@sugarat/theme/node'


const blogTheme = getThemeConfig({
  comment: {
    repo:'Cerry2022/Cerry2022.github.io',
    repoId: 'R_kgDOLnx31Q',
    category: 'Announcements',
    categoryId: 'DIC_kwDOLnx31c4CjO4f',
    inputPosition: 'top',
  }
})

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: 'zh-cn',
  title: 'Cerry`s blog',
  description: '粥里有勺糖的博客主题，基于 vitepress 实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      {
		text:'折腾记录',
        items:[
            {text:'CPU大杂烩',link:'/jijingdebiji/CPU_da_zha_hui.md'},
            {text:'Linux下信号量实现',link:'/jijingdebiji/Linux下信号量实现.md'},
            {text:'vim自动补全插件',link:'/jijingdebiji/vim自动补全插件.md'},
            {text:'记一次win11安装WSL2及Debian的配置',link:'/jijingdebiji/记一次win11安装WSL2及Debian的配置.md'},
            {text:'配置vim下的c_c++开发环境',link:'/jijingdebiji/配置vim下的c_c++开发环境.md'},
            {text:'一个linux下使用线程的案例',link:'/jijingdebiji/一个linux下使用线程的案例.md'},
        ]
        
      },
      { text: '关于作者', link: 'https://sugarat.top/aboutme.html' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
      }
    ]
  }
})
