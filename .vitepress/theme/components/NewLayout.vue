<template>
  <Layout>
    <template #doc-before>
      <div style="padding-top:20px;" class='post-info' v-if="!frontmatter.page">
        {{ (frontmatter.date?.toString() ?? '').substring(0,10) }}
        <span v-for="item in frontmatter.tags">
          <a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a>
        </span>
      </div>
    </template>
    <template #doc-bottom>
        <Comment />
    </template>
  </Layout>
  <Copyright />
  <VercelAnalytics />
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import VercelAnalytics from './VercelAnalytics.vue'
import { useData, withBase } from "vitepress";

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>
