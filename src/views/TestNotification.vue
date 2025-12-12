<script setup lang="ts">
import { useMessage, useNotification, useDialog } from 'naive-ui'

const message = useMessage()
const notification = useNotification()
const dialog = useDialog()

const showMessage = (type: 'info' | 'success' | 'warning' | 'error') => {
  message[type](`这是一个 ${type} 消息`)
}

const showNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
  notification[type]({
    content: `这是一个 ${type} 通知`,
    meta: '通知详情',
    duration: 2500,
    keepAliveOnHover: true
  })
}

const showDialog = () => {
  dialog.warning({
    title: '警告',
    content: '你确定要执行此操作吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('你点击了确定')
    },
    onNegativeClick: () => {
      message.info('你点击了取消')
    }
  })
}
</script>

<template>
  <n-space vertical>
    <n-card title="全局消息 (Message)">
      <n-space>
        <n-button @click="showMessage('info')">Info</n-button>
        <n-button type="success" @click="showMessage('success')">Success</n-button>
        <n-button type="warning" @click="showMessage('warning')">Warning</n-button>
        <n-button type="error" @click="showMessage('error')">Error</n-button>
      </n-space>
    </n-card>

    <n-card title="通知 (Notification)">
      <n-space>
        <n-button @click="showNotification('info')">Info</n-button>
        <n-button type="success" @click="showNotification('success')">Success</n-button>
        <n-button type="warning" @click="showNotification('warning')">Warning</n-button>
        <n-button type="error" @click="showNotification('error')">Error</n-button>
      </n-space>
    </n-card>

    <n-card title="对话框 (Dialog)">
      <n-button type="warning" @click="showDialog">打开对话框</n-button>
    </n-card>
  </n-space>
</template>