<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// 模拟用户数据
const userInfo = ref({
  username: 'Admin User',
  email: 'admin@trao-ui.com',
  role: '超级管理员',
  avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  department: '技术研发部',
  joinDate: '2024-01-01'
})

const handleLogout = () => {
  message.success('已退出登录')
}

const handleProfile = () => {
  message.info('跳转至个人中心')
}
</script>

<template>
  <n-popover trigger="click" placement="bottom-end" style="padding: 0; border-radius: 16px;">
    <template #trigger>
      <n-avatar
        round
        size="medium"
        :src="userInfo.avatar"
        class="cursor-pointer hover:opacity-80 transition-opacity"
      />
    </template>
    
    <div class="w-72">
      <!-- 头部背景 -->
      <div class="h-16 bg-gradient-to-r from-[#000000] to-[#007bff] rounded-t-16px"></div>
      
      <!-- 个人信息 -->
      <div class="px-4 pb-4 -mt-8 relative">
        <n-avatar
          round
          :size="64"
          :src="userInfo.avatar"
          class="border-4 border-white dark:border-gray-800"
        />
        
        <div class="mt-2">
          <div class="text-lg font-bold">{{ userInfo.username }}</div>
          <div class="text-gray-500 text-sm">{{ userInfo.email }}</div>
        </div>

        <div class="mt-4 space-y-2">
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div class="i-carbon-badge mr-2"></div>
            <span>{{ userInfo.role }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div class="i-carbon-enterprise mr-2"></div>
            <span>{{ userInfo.department }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div class="i-carbon-calendar mr-2"></div>
            <span>入职时间: {{ userInfo.joinDate }}</span>
          </div>
        </div>

        <n-divider class="my-3" />

        <div class="flex justify-between gap-2">
          <n-button secondary class="flex-1" @click="handleProfile">
            <template #icon>
              <div class="i-carbon-user"></div>
            </template>
            个人中心
          </n-button>
          <n-button secondary type="error" class="flex-1" @click="handleLogout">
            <template #icon>
              <div class="i-carbon-logout"></div>
            </template>
            退出登录
          </n-button>
        </div>
      </div>
    </div>
  </n-popover>
</template>