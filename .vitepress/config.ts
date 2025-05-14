import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import wikilinks from '@gardeners/markdown-it-wikilinks' // 导入插件
import sanitize from 'sanitize-filename';


//每页的文章数量
const pageSize = 10

export default defineConfig({
    title: 'Cerry\'blog',
    base: '/',
	sitemap: {
    hostname: 'https://Cerry2022.github.io'
	},
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/Cerry2022/Cerry2022.github.io', //copyright link
        // 评论的仓库地址
        comment: {
            repo: 'Cerry2022/Cerry2022.github.io',
            themes: 'github-light',
            issueTerm: 'pathname'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/pages/category' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' },
            { text: 'Link', link : '/pages/link' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local',

        },
        //outline:[2,3],
        outline: {
            label: '文章摘要'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/Cerry2022/Cerry2022.github.io' }]
    } as any,
    srcExclude: ['README.md',  'template/*.md',], // exclude the README.md , needn't to compiler

    vite: {
        //build: { minify: false }
        server: {
            port: 5000
        },

    },
	markdown: {
	config: (md) => {
	md.use(wikilinks({
	baseURL: '/',          // 链接的基础 URL
	relativeBaseURL: './', // 相对链接的基础 URL
	makeAllLinksAbsolute: true,   // 所有链接使用绝对路径
	uriSuffix: '.html',        // 链接的后缀名
	htmlAttributes: {},         // 链接的 HTML 属性

	//  处理图片相关的配置：
	assetPrefix: '/',           // 图片路径前缀 (根据你的图片存放位置修改)
	imagePattern: /!\[\[([^\]\|]+?)(?:\|([^\]\|]+?))?(?:\|([^\]\|]+?))?\]\]/, // 修改后的正则表达式

	// 其他配置（根据需要调整）：
	linkPattern: /\[\[([^|]+?)(\|([\s\S]+?))?\]\]/,   // 原本的链接匹配规则
	generatePageNameFromLabel: (label) => label,  // 这里不需要转换
	postProcessPageName: (pageName) => {
	  pageName = pageName.trim();
	  pageName = pageName.split('/').map(sanitize).join('/');
	  pageName = pageName.replace(/\s+/, '_');
	  return pageName;
	},
	postProcessLabel: (label) => {
	  label = label.trim();
	  return label;
	},
	includeWikilinks: false    // 避免图片也套上 [[...]]，看起来会很奇怪
	}))
	}
	},
	cleanUrls: true,
})
