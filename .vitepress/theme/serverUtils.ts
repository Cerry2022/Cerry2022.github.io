import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';
import { resolve } from 'path';
import path from 'path';
import { convertDateV2 } from './date';

// 获取所有文章信息并排序
async function getPosts(pageSize: number) {
    const isProd = process.env.NODE_ENV === 'production';
    // 无论生成环境如何，都需要排除的文件夹
    const alwaysIgnorePaths = [' '];
    // 根据生成环境确定的需要排除的文件夹
    const prodIgnorePaths = ['posts/draft/**/*.md', 'posts/private-notes/**/*.md', 'posts/trash/**/*.md'];
    // 合并需要排除的路径
    const ignorePaths = isProd ? [...prodIgnorePaths, ...alwaysIgnorePaths] : alwaysIgnorePaths;
    // 使用 globby 获取文件路径
    let paths = await globby(['posts/**/**.md'], {
        ignore: ignorePaths
    });

    // 生成分页页面 markdown 文件
    await generatePaginationPages(paths.length, pageSize);

    // 异步处理所有文件
    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8');
            const { data, content: postContent } = matter(content); // 同时解构出 front matter (data) 和文章内容 (postContent)

            // 使用 convertDateV2 转换日期
            const convertedDate = convertDateV2(data.date);
            // 获取文件名（不包含 .md 扩展名），用于 fallback
            const fileName = path.basename(item, '.md');
            // 处理 order 字段，确保是数字，非数字或不存在时默认为 0
            const processedOrder = _convertOrder(data.order);

            // --- 添加 description 处理逻辑 ---
            let description = data.description;
            if (!description) {
                // 如果没有 description 属性，从文章内容生成一个简要描述
                const plainTextContent = postContent
                    .replace(/```[\s\S]*?```/g, '') // 移除代码块
                    .replace(/`.*?`/g, '') // 移除行内代码
                    .replace(/#+\s/g, '') // 移除标题
                    .replace(/[\*_~`]/g, '') // 移除粗体、斜体等标记
                    .replace(/^-+\s/gm, '') // 移除列表标记
                    .replace(/^>\s/gm, '') // 移除引用标记
                    .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
                    .replace(/\!\[.*?\]\(.*?\)/g, '') // 移除图片
                    .replace(/\n+/g, ' ') // 将换行符替换为空格
                    .trim(); // 移除首尾空白

                // 截取前 200 个字符并添加省略号
                description = plainTextContent.substring(0, 200) + (plainTextContent.length > 200 ? '...' : '');
            }
            // --- 结束 description 处理逻辑 ---

            return {
                frontMatter: {
                    ...data, // 保留原有 front matter 数据
                    date: convertedDate, // 使用转换后的日期
                    order: processedOrder, // 添加处理后的 order 字段
                    description: description // 添加或覆盖 description 字段
                },
                regularPath: `/${item.replace('.md', '.html')}`,
                fileName: fileName // 添加 fileName 属性
            };
        })
    );

    // 根据 order 和 date 排序文章
    posts.sort(_compareDate as any);

    return posts;
}

// 根据总文章数和每页大小生成分页 markdown 文件
async function generatePaginationPages(total: number, pageSize: number) {
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    const paths = resolve('./');

    // 只有当总文章数大于 0 时才生成分页文件
    if (total > 0) {
        for (let i = 1; i < pagesNum + 1; i++) {
            const page = `
---
page: true
title: ${i === 1 ? 'home' : 'page_' + i}
aside: false
comment: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
// 使用 slice 获取当前页的文章列表
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i});
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim();

            const file = paths + `/page_${i}.md`;
            await fs.writeFile(file, page);
        }
    }

    // 将 page_1.md 重命名为 index.md 作为首页
    if (fs.existsSync(paths + '/page_1.md')) {
       await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true });
    }
}

// 帮助函数：比较文章，先按 order 降序，再按 date 降序
function _compareDate(
    obj1: { frontMatter: { date: string; order: number } },
    obj2: { frontMatter: { date: string; order: number } }
): number {
    // 先按 order 降序排序
    const orderCompare = obj2.frontMatter.order - obj1.frontMatter.order;
    if (orderCompare !== 0) {
        return orderCompare;
    }
    // 如果 order 相同，再按 date 降序排序 (假设 date 已经是可比较的格式)
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

// 帮助函数：转换 order 字段为数字，非数字或不存在时默认为 0
function _convertOrder(input?: unknown): number {
    if (input === undefined || input === null) return 0;
    if (typeof input === 'number') return input;
    const num = Number(input);
    return isNaN(num) ? 0 : num;
}

export { getPosts };
