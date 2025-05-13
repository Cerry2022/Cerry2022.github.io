<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                {{ article.frontMatter.order > 0 ? '📌' : '' }}
                <a :href="withBase(article.regularPath)">
                    {{ article.frontMatter.title ? article.frontMatter.title : article.fileName }}
                </a>
            </div>
        </div>
        <p class="describe" v-html="article.frontMatter.description"></p>
        <div class='post-info'>
            {{ article.frontMatter.date }}
            <span v-for="item in article.frontMatter.tags" :key="item">
                <a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a>
            </span>
        </div>
    </div>

    <!-- 新增：当总页数大于1时显示分页 -->
    <div class="pagination" v-if="pagesNum > 1">
        <!-- 使用 computed 的 pageArray 生成分页链接 -->
        <span v-for="(item, index) in pageArray" :key="index" :class="['link', { active: item === pageCurrent }]">
            <!-- 处理省略号 -->
            <template v-if="item === '...'"> ... </template>
            <!-- 处理当前页，不作为链接 -->
            <template v-else-if="item === pageCurrent">
                {{ item }}
            </template>
            <!-- 处理其他页，生成链接 -->
            <template v-else>
                <a :href="withBase(item === 1 ? '/index.html' : `/page_${item}.html`)">
                    {{ item }}
                </a>
            </template>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { PropType, computed } from 'vue'
import { generatePaginationArray } from '../pagination'

// 合并 Article 接口的定义
interface Article {
    regularPath: string
    fileName: string
    frontMatter: {
        order: number
        title: string
        description: string
        date: string
        tags: string[]
    }
}

// 将 defineProps 赋值给 props
const props = defineProps({
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

// 新增 computed 属性，根据总页数和当前页生成分页数组
const pageArray = computed(() => {
    return generatePaginationArray(props.pagesNum, props.pageCurrent)
})
</script>

<style scoped>
.post-list {
    /* 应用 HEAD 的卡片化样式 */
    background-color: var(--vp-c-bg-soft);
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider-light);
    /* 可以选择使用阴影代替边框: box-shadow: 0 1px 3px rgba(0,0,0,0.05); */
}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    /* 应用 HEAD 的颜色 */
    color: var(--bt-theme-title) !important;
    /* 应用 HEAD 的 margin 调整 */
    margin: 0.1rem 0 0.5rem 0;
}

.post-title a {
    /* 应用 HEAD 的颜色 */
    color: var(--bt-theme-title) !important;
}

.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    /* 应用 HEAD 的 margin 调整 */
    margin-top: 0;
    margin-bottom: 0.75rem;
    line-height: 1.5rem;
}

.post-info {
    /* 应用 HEAD 的样式调整 */
    font-size: 0.875rem;
    color: var(--vp-c-text-3);
}

.post-info span {
    /* 应用 HEAD 的标签间距 */
    margin-left: 0.5rem;
}

.post-info span a {
    /* 应用 HEAD 的标签链接样式 */
    color: var(--vp-c-text-3);
    text-decoration: none;
    border-bottom: 1px dotted var(--vp-c-text-3);
    padding: 0 2px;
}

.post-info span a:hover {
    /* 应用 HEAD 的标签链接 hover 样式 */
    color: var(--vp-c-brand);
    border-bottom-color: var(--vp-c-brand);
}

.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}

.link {
    /* 应用 HEAD 的圆形链接样式 */
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 24px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    margin: 0 3px;
    font-weight: 400;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
}

.link.active {
    /* 应用 HEAD 的激活样式 */
    background: var(--vp-c-brand);
    color: var(--vp-c-neutral-inverse);
    border-color: var(--vp-c-brand) !important;
    font-weight: 600;
}

.link:not(.active):hover {
    /* 应用 HEAD 的非激活 hover 样式 */
    border-color: var(--vp-c-text-2);
    color: var(--vp-c-text-1);
}

@media screen and (max-width: 768px) {
    .post-list {
        /* 应用 HEAD 的移动端 padding/margin 调整 */
        padding: 0.8rem;
        margin-bottom: 0.8rem;
    }

    /* 移除 upstream/main 中冗余的 .post-header 规则 */
    /* .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */

    .post-title {
        /* 应用 HEAD 的移动端 font-size/width 调整 */
        font-size: 1rem;
        width: auto; /* 移除固定宽度 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .describe {
        /* 应用 HEAD 的移动端 font-size/margin 调整 */
        font-size: 0.875rem;
        margin: 0.5rem 0 0.75rem;
    }
}
</style>