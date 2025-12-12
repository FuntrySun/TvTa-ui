<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<template>
  <n-card title="Pinia 状态管理测试">
    <div class="mb-4">
      当前主题模式: 
      <n-tag :type="isDark ? 'info' : 'warning'">
        {{ isDark ? '深色模式' : '浅色模式' }}
      </n-tag>
    </div>
    <n-button @click="themeStore.toggleTheme">切换主题</n-button>
    <p class="mt-4 text-gray-500">
      点击切换按钮，观察顶部栏和整个应用的主题变化。这证明了 Pinia 状态在组件间是共享和响应式的。
    </p>
  </n-card>
</template>