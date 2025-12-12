<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="i-carbon-rocket text-6xl text-teal-600 mb-4" />
    <h1 class="text-3xl font-bold mb-2">欢迎使用 TvTa UI</h1>
    <p class="text-gray-500">基于 Tauri 2.0 + Vue 3 的跨平台应用模板</p>
    <div class="mt-8 flex gap-4">
      <n-button type="primary" @click="$router.push('/test/axios')">开始测试</n-button>
      <n-button @click="$router.push('/test/notification')">查看演示</n-button>
    </div>
  </div>
</template>