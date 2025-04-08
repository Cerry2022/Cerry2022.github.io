<script setup>
import { onMounted } from 'vue';
import { inject } from '@vercel/analytics';

// 确保只在浏览器环境且是生产构建时执行注入
// import.meta.env.PROD 是 Vite 提供的环境变量，在生产构建时为 true
// typeof window !== 'undefined' 确保在浏览器环境中
const isProduction = import.meta.env.PROD;
const isBrowser = typeof window !== 'undefined';

onMounted(() => {
  if (isProduction && isBrowser) {
    inject(); // 调用 inject 函数来注入 Vercel Analytics
    // Vercel Analytics 会自动处理后续的页面浏览跟踪（包括 SPA 路由切换）
    // console.log('Vercel Analytics injected.'); // 可选：用于调试
  }
});
</script>

<template>
  <!-- 这个组件不需要渲染任何可见内容 -->
</template>