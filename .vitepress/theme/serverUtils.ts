import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';
import { resolve, join } from 'path'; // 导入 join (来自 upstream/main) 和 resolve
import path from 'path'; // 导入 path (来自 HEAD)
import { convertDateV2 } from './date'; // 导入 convertDateV2 (来自 upstream/main) - 确保此文件存在

async function getPosts(pageSize: number) {
    // 判断是否是生产环境 (来自 upstream/main)
    const isProd = process.env.NODE_ENV === 'production';
    // 定义生产环境下需要忽略的路径 (来自 upstream/main)
    const ignorePaths = isProd ? ['posts/draft/**/*.md', 'posts/private-notes/**/*.md', 'posts/trash/**/*.md'] : [];

    // 使用 globby 获取文件路径，并应用忽略规则 (修改自 HEAD 和 upstream/main)
    let paths = await globby(['posts/**/**.md'], {
        ignore: ignorePaths
    });

    // 生成分页页面 markdown 文件 (来自 HEAD 和 upstream/main)
    // 注意：这里只是生成文件，实际 VitePress 读取并处理这些文件
    await generatePaginationPages(paths.length, pageSize);

    // 异步处理所有文件
    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8');
            const { data } = matter(content);

            // 使用 convertDateV2 转换日期 (来自 upstream/main)
            // 并且保留 original date 字段
            const convertedDate = convertDateV2(data.date);

            // 获取文件名（不包含 .md 扩展名），用于 fallback (来自 HEAD)
            const fileName = path.basename(item, '.md');

            // 处理 order 字段，确保是数字，非数字或不存在时默认为 0 (来自 upstream/main)
            const processedOrder = _convertOrder(data.order);

            return {
                frontMatter: {
                    ...data, // 保留原有 front matter 数据
                    date: convertedDate, // 使用转换后的日期
                    order: processedOrder // 添加处理后的 order 字段
                },
                regularPath: `/${item.replace('.md', '.html')}`,
                fileName: fileName // 添加 fileName 属性 (来自 HEAD)
            };
        })
    );

    // 根据 order 和 date 排序文章 (使用 upstream/main 的排序逻辑)
    posts.sort(_compareDate as any); // 使用 as any 绕过可能的类型不完全匹配问题

    return posts;
}

async function generatePaginationPages(total: number, pageSize: number) {
    // 计算总页数
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    const paths = resolve('./');

    // 只有当总文章数大于 0 时才生成分页文件
    // (虽然循环条件本身会处理 total=0 的情况，但显式检查更清晰，保留 HEAD 的思路)
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
`.trim(); // 使用 trim() 移除末尾空行

            const file = paths + `/page_${i}.md`;
            await fs.writeFile(file, page);
        }
    }

    // 将 page_1.md 重命名为 index.md 作为首页 (来自 HEAD 和 upstream/main)
    // 只有当 page_1.md 存在时才进行移动 (即 total > 0)
    if (fs.existsSync(paths + '/page_1.md')) {
       await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true });
    }
}

// 帮助函数：比较文章，先按 order 降序，再按 date 降序 (来自 upstream/main)
function _compareDate(
    obj1: { frontMatter: { date: string; order: number } }, // 类型根据实际 convertDateV2 返回值调整，这里假设是 string
    obj2: { frontMatter: { date: string; order: number } } // 类型根据实际 convertDateV2 返回值调整
): number {
    // 先按 order 降序排序
    const orderCompare = obj2.frontMatter.order - obj1.frontMatter.order;
    if (orderCompare !== 0) {
        return orderCompare;
    }
    // 如果 order 相同，再按 date 降序排序
    // 注意：这里假设 date 已经是可比较的格式，如 'YYYY-MM-DD'
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

// 帮助函数：转换 order 字段为数字 (来自 upstream/main)
function _convertOrder(input?: unknown): number {
    if (input === undefined || input === null) return 0;
    if (typeof input === 'number') return input;
    const num = Number(input);
    return isNaN(num) ? 0 : num;
}

// 帮助函数：将日期转换为 'YYYY-MM-DD' 格式 (来自 HEAD)
// 注意：这个函数在合并后不再直接使用，因为改用了 convertDateV2
// 但是作为 HEAD 原有的功能，如果 convertDateV2 不存在或不符合需求，可以切换回来
/*
function _convertDate_HEAD(date: string | Date = new Date()): string {
    const json_date = new Date(date).toJSON();
    return json_date.split('T')[0];
}
*/

export { getPosts };