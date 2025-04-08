// .vitepress/theme/NewLayout.vue (假设你的布局文件是这个)
<template>
  <Layout>
    <!-- 你现有的插槽和内容 -->
    <template #doc-before>
      <div style="padding-top:20px;" class='post-info' v-if="!frontmatter.page"> <!-- 建议使用 frontmatter -->
        {{ (frontmatter.date?.toString() ?? '').substring(0,10) }}
          
        <span v-for="item in frontmatter.tags"> <!-- 建议使用 frontmatter -->
          <a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a>
        </span>
      </div>
    </template>
    <!-- 其他可能的插槽自定义 -->
  </Layout>
  <Copyright />
  <VercelAnalytics /> <!-- 在这里添加 Vercel Analytics 组件 -->
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import VercelAnalytics from './VercelAnalytics.vue' // <-- 1. 导入 Vercel 分析组件
import { useData, withBase } from "vitepress"; // <-- 2. 推荐使用 useData 获取 frontmatter

const { Layout } = DefaultTheme
const { frontmatter } = useData() // <-- 3. 使用 useData().frontmatter 替代 $frontmatter
</script>