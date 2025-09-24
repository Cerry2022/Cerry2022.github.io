<template>
    <div class="tags">
        <span @click="toggleTag(String(key))" v-for="(_, key) in data" :key="key" class="tag">
            {{ key }} <sup>{{ data[key].length }}</sup>
        </span>
    </div>

    <div class="tag-header">{{ selectTag }}</div>

    <a
        :href="withBase(article.regularPath)"
        v-for="(article, index) in selectTag ? data[selectTag] : []"
        :key="index"
        class="posts"
    >
        <div class="post-container">
            <div class="post-dot"></div>
            {{ article.frontMatter.title ? article.frontMatter.title : article.fileName }}
        </div>
        <div class="date">{{ article.frontMatter.date }}</div>
    </a>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useData, withBase } from 'vitepress';
import { initTags } from '../functions';

let url = location.href.split('?')[1];
let params = new URLSearchParams(url);
const { theme } = useData();
const data = computed(() => initTags(theme.value.posts));
let selectTag = ref(params.get('tag') ? params.get('tag') : '');

const toggleTag = (tag: string) => {
  selectTag.value = tag;
};

// 如果 URL 中没有指定标签，则默认选择第一个标签
const defaultDisplayTag = Object.keys(data.value)[0];
if (defaultDisplayTag) {
  toggleTag(defaultDisplayTag);
}
</script>

<style scoped>
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 0 16px 4px 16px;
  margin: 6px 8px;
  font-size: 0.875rem;
  line-height: 25px;
  background-color: var(--vp-c-bg-alt);
  transition: 0.4s;
  border-radius: 2px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.tag sup {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.tag-header {
  padding: 28px 0 10px 0;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--bt-theme-title);
  font-family: var(--date-font-family);
}

.posts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--vp-c-divider);
    padding: 14px 0;
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.post-container {
    display: flex;
    align-items: center;
}

.post-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--vp-c-brand);
    margin-right: 8px;
}

.date {
    font-size: 0.875rem;
    color: var(--vp-c-text-2);
}


@media screen and (max-width: 768px) {
  .date {
    font-size: 0.75rem;
  }

  /* 可选：如果文章标题过长，可以在移动端进行截断 */
  .posts .post-container {
       /* 允许标题部分占据更多空间，并根据需要截断 */
       flex-grow: 1;
       margin-right: 8px; /* 和日期之间留白 */
       overflow: hidden; /* 结合 text-overflow/white-space 隐藏溢出 */
       text-overflow: ellipsis; /* 显示省略号 */
       white-space: nowrap; /* 防止换行 */
  }
}
</style>