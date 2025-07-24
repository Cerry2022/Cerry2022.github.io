<template>
    <!-- 不再需要 .post-list-container，直接渲染卡片 -->
    <div 
        v-for="(article, index) in posts" 
        :key="index" 
        class="post-item-card" 
        :class="{ 'pinned-post': article.frontMatter.order > 0 }"
    >
        <a :href="withBase(article.regularPath)" class="post-link">
            <div class="post-content-wrapper">
                <h2 class="post-title-main">
                    <!-- 置顶图标 -->
                    <span v-if="article.frontMatter.order > 0" class="pinned-icon">📌</span>
                    {{ article.frontMatter.title ? article.frontMatter.title : article.fileName }}
                </h2>
                <p class="post-description" v-html="article.frontMatter.description"></p>
            </div>

            <div class="post-meta-wrapper">
                <div class="post-date-wrapper">
                    <!-- 时钟图标 -->
                    <span class="meta-icon clock-icon"></span> 
                    <span class="post-date">{{ article.frontMatter.date }}</span>
                </div>
                <div class="post-tags">
                    <span v-for="item in article.frontMatter.tags" :key="item" class="tag-pill">
                        {{ item }}
                    </span>
                </div>
            </div>
        </a>
    </div>

    <!-- 分页部分保持不变 -->
    <div class="pagination" v-if="pagesNum > 1">
        <span v-for="(item, index) in pageArray" :key="index" :class="['link', { active: item === pageCurrent }]">
            <template v-if="item === '...'"> ... </template>
            <template v-else-if="item === pageCurrent">
                {{ item }}
            </template>
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

interface Article {
    regularPath: string; fileName: string;
    frontMatter: { order: number; title: string; description: string; date: string; tags: string[] }
}
const props = defineProps({
    posts: { type: Array as PropType<Article[]>, required: true },
    pageCurrent: { type: Number as PropType<number>, required: true },
    pagesNum: { type: Number as PropType<number>, required: true }
})
const pageArray = computed(() => generatePaginationArray(props.pagesNum, props.pageCurrent))
</script>

<style scoped>
/* 整个文章卡片容器 - 柔和的独立卡片设计 */
.post-item-card {
    border: 1px solid var(--vp-c-divider); /* 保留一个非常细的边框，增加清晰度 */
    border-radius: 12px; /* 更大的圆角，更柔和 */
    padding: 1.0rem;
    margin-bottom: 1.0rem; /* 卡片之间的垂直间距，作为柔和的分割 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 非常淡的阴影，增加层次感 */
    transition: all 0.25s ease-in-out;
}

.post-item-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* 悬停时阴影加深 */
    transform: translateY(-4px); /* 悬停时微微上浮 */
    border-color: var(--vp-c-brand-soft);
}

/* 重点：置顶文章的特殊样式 */
.pinned-post {
    background-color: var(--pinned-post-bg-color, var(--vp-c-bg-soft)); /* 使用全局变量或备用色 */
    border-color: var(--vp-c-brand-soft);
}

/* 链接包裹整个条目 */
.post-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%; /* 确保链接填满整个卡片 */
}

/* 标题和描述内容区域 */
.post-content-wrapper {
    flex-grow: 1; /* 让内容区域自动扩展，将元数据推到底部 */
    margin-bottom: 1.0rem;
}

.post-title-main {
    padding-top: 12px;
    color: var(--bt-theme-title); /* 使用你的全局标题颜色 */
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0 0 0.75rem 0;
    line-height: 1.5;
    transition: color 0.2s ease-in-out;
}
.post-link:hover .post-title-main {
    color: var(--vp-c-brand);
}

.post-description {
    font-size: 0.9375rem;
    color: var(--vp-c-text-2);
    line-height: 1.7;
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 限制描述为2行 */
    overflow: hidden;
}

/* 底部元数据（日期和标签） */
.post-meta-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--vp-c-text-2);
    margin-top: auto; /* 确保元数据总是贴在卡片底部 */
}

.post-date-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 时钟图标 */
.clock-icon {
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    border: 1px solid var(--vp-c-text-3);
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
}
.clock-icon::before, .clock-icon::after {
    content: '';
    position: absolute;
    background-color: var(--vp-c-text-3);
    transform-origin: bottom;
}
.clock-icon::before { width: 1px; height: 40%; top: 10%; left: calc(50% - 0.5px); }
.clock-icon::after { width: 1px; height: 25%; top: 25%; left: calc(50% - 0.5px); transform: rotate(90deg); }

.post-date {
    color: var(--date-color); /* 使用你的全局日期颜色 */
    font-family: var(--date-font-family); /* 使用你的全局日期字体 */
    font-size: 0.85rem;
    letter-spacing: 0.5px;
}

/* 标签样式 (白色背景，蓝色文字) */
.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag-pill {
    background-color: var(--tag-bg-color, var(--vp-c-bg));
    color: var(--tag-text-color, var(--vp-c-brand));
    border: 1px solid var(--tag-border-color, var(--vp-c-divider));
    padding: 5px 12px;
    border-radius: 9999px; /* 药丸形状 */
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
}
.tag-pill:hover {
    background-color: var(--tag-hover-bg-color, var(--vp-c-bg-soft));
    color: var(--tag-hover-text-color, var(--vp-c-brand-dark));
    border-color: var(--tag-hover-border-color, var(--vp-c-brand));
    cursor: pointer;
}

/* 分页样式 (保持不变) */
.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 6px;
}

.link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    line-height: 1;
    border: 1px solid var(--vp-c-divider);
    border-radius: 50%;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    color: var(--vp-c-text-2);
}
.link a {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.link.active {
    background: var(--vp-c-brand);
    color: var(--vp-c-white);
    border-color: var(--vp-c-brand);
}
.link:not(.active):hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
    .post-item-card {
        padding: 1.25rem;
        margin-bottom: 1rem;
    }
    .post-title-main {
        font-size: 1.15rem;
    }
    .post-description {
        -webkit-line-clamp: 3;
    }
    .post-meta-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
}
</style>