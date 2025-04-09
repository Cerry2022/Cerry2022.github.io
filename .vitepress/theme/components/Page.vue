<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                <a :href="withBase(article.regularPath)">   {{ article.frontMatter.title ? article.frontMatter.title : article.fileName }}</a>
            </div>
        </div>
        <p class="describe" v-html="article.frontMatter.description"></p>
        <div class='post-info'>
            {{ article.frontMatter.date }} <span v-for="item in article.frontMatter.tags"><a
                    :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
        </div>
    </div>

    <div class="pagination">
        <a class="link" :class="{ active: pageCurrent === i }" v-for="i in pagesNum" :key="i"
            :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)">{{ i }}</a>
    </div>
</template>

<script lang="ts" setup>

import { withBase } from 'vitepress'
import { PropType } from 'vue'
interface Article {
    regularPath: string;
    fileName: string;
    frontMatter: {
        title: string;
        description: string;
        date: string;
        tags: string[];
    };
}
defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true
    }
})
</script>

<style scoped>
.post-list {
    /* border-bottom: 1px dashed var(--vp-c-divider-light); */
    /* <--- 移除或注释掉 */
    /* padding: 14px 0 14px 0; */
    /* <--- 移除或注释掉 */

    /* --- 新增/修改的样式 --- */
    background-color: var(--vp-c-bg-soft);
    /* 新增: 使用 Vp 主题柔和背景色 (如果变量不存在，可选 var(--vp-c-bg) 或具体颜色 #fff / #f9f9f9) */
    padding: 1rem;
    /* 修改: 为卡片添加四周内边距 (可调整 1rem = 16px) */
    margin-bottom: 1rem;
    /* 新增: 添加卡片间的外边距 */
    border-radius: 8px;
    /* 新增: 添加圆角 (可调整) */
    border: 1px solid var(--vp-c-divider-light);
    /* 新增: 添加边框 (可选，也可以用 box-shadow) */
    /* 或者使用阴影替代边框: */
    /* box-shadow: 0 1px 3px rgba(0,0,0,0.05); */
    /* --- 结束 新增/修改的样式 --- */
}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--bt-theme-title) !important;
    margin: 0.1rem 0;
    /* 可能需要调整标题下方的 margin，因为卡片已有 padding */
    margin-bottom: 0.5rem;
}

.post-title a {
    color: var(--bt-theme-title) !important;
}

.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    /* margin: 10px 0; */
    /* 保持或调整，看卡片内边距效果 */
    margin-top: 0;
    margin-bottom: 0.75rem;
    /* 调整下方间距 */
    line-height: 1.5rem;
}

.post-info {
    font-size: 0.875rem;
    /* 可以考虑稍微缩小一点字体 */
    color: var(--vp-c-text-3);
    /* 使用更次要的文本颜色 */
    /* 其他样式保持 */
}

.post-info span {
    margin-left: 0.5rem;
    /* 给标签之间加点间距 */
}

.post-info span a {
    color: var(--vp-c-text-3);
    /* 标签链接颜色与信息文本一致 */
    text-decoration: none;
    border-bottom: 1px dotted var(--vp-c-text-3);
    /* 添加下划线区分 */
    padding: 0 2px;
}

.post-info span a:hover {
    color: var(--vp-c-brand);
    /* 鼠标悬停时高亮 */
    border-bottom-color: var(--vp-c-brand);
}


.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}

.link {
    display: inline-block;
    width: 26px;
    height: 26px;
    /* 让宽高一致，更容易变圆 */
    line-height: 24px;
    /* 垂直居中文本 */
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    /* border-right: none; */
    /* 移除，让每个链接都有完整边框 */
    margin: 0 3px;
    /* 添加左右外边距 */
    font-weight: 400;
    border-radius: 50%;
    /* 直接变圆形 */
    transition: all 0.2s ease-in-out;
    /* 添加过渡效果 */
}

/* .link:last-child {
    border-right: 1px var(--vp-c-divider-light) solid; /* 最后一个补上右边框 (如果不用 margin) */
/* } */

.link.active {
    background: var(--vp-c-brand);
    /* 使用品牌色作为激活背景 */
    color: var(--vp-c-neutral-inverse);
    border-color: var(--vp-c-brand) !important;
    /* 边框也用品牌色 */
    font-weight: 600;
    /* 加粗 */
}

.link:not(.active):hover {
    border-color: var(--vp-c-text-2);
    /* 鼠标悬停时边框变色 */
    color: var(--vp-c-text-1);
}

@media screen and (max-width: 768px) {
    .post-list {
        /* padding: 14px 0 14px 0; */
        /* <--- 移除或注释掉 */
        padding: 0.8rem;
        /* 移动端可以稍微减小内边距 */
        margin-bottom: 0.8rem;
        /* 移动端可以稍微减小外边距 */
    }

    /* .post-header ... */
    /* 其他移动端样式如果不需要针对卡片调整，则保持不变 */
    .post-title {
        font-size: 1rem;
        /* 移动端标题可稍小 */
        /* width: 17rem; */
        /* 移除固定宽度，让其自适应卡片宽度减去 padding */
        width: auto;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .describe {
        font-size: 0.875rem;
        /* 移动端描述可稍小 */
        margin: 0.5rem 0 0.75rem;
        /* 调整间距 */
    }
}
</style>
