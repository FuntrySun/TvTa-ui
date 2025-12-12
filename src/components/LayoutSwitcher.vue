<script setup lang="ts">
import { useLayoutStore, type LayoutType } from '@/stores/layout'

const layoutStore = useLayoutStore()

const layouts = [
  {
    type: 'sider' as LayoutType,
    name: '侧边导航',
    icon: 'i-carbon-page-scroll'
  },
  {
    type: 'top' as LayoutType,
    name: '顶部导航',
    icon: 'i-carbon-page-first'
  }
]
</script>

<template>
  <n-popover trigger="click" placement="bottom" style="padding: 0; border-radius: 16px;">
    <template #trigger>
      <button class="icon-btn i-carbon-template text-xl" title="切换布局" />
    </template>
    <div class="p-2 grid grid-cols-2 gap-2 w-64">
      <div
        v-for="layout in layouts"
        :key="layout.type"
        class="cursor-pointer border-2 rounded p-2 hover:border-teal-500 transition-colors"
        :class="layoutStore.currentLayout === layout.type ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'"
        @click="layoutStore.setLayout(layout.type)"
      >
        <div class="flex flex-col items-center gap-2">
          <!-- 简易缩略图模拟 -->
          <div class="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded flex overflow-hidden border border-gray-300 dark:border-gray-600">
            <template v-if="layout.type === 'sider'">
              <div class="w-1/4 h-full bg-gray-400 dark:bg-gray-500"></div>
              <div class="w-3/4 h-full flex flex-col">
                <div class="h-1/4 w-full bg-gray-300 dark:bg-gray-600 border-b border-gray-400/20"></div>
                <div class="flex-1 bg-white dark:bg-gray-800"></div>
              </div>
            </template>
            <template v-else>
              <div class="w-full h-full flex flex-col">
                <div class="h-1/4 w-full bg-gray-400 dark:bg-gray-500"></div>
                <div class="flex-1 bg-white dark:bg-gray-800"></div>
              </div>
            </template>
          </div>
          <span class="text-xs">{{ layout.name }}</span>
        </div>
      </div>
    </div>
  </n-popover>
</template>