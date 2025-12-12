<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import { useMessage } from 'naive-ui'

const url = ref('/api/test')
const method = ref('GET')
const response = ref('')
const loading = ref(false)
const message = useMessage()

const options = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' }
]

const sendRequest = async () => {
  loading.value = true
  response.value = ''
  try {
    const res = await request({
      url: url.value,
      method: method.value
    })
    response.value = JSON.stringify(res, null, 2)
    message.success('请求成功')
  } catch (error: any) {
    response.value = error.message
    // message.error('请求失败') // Interceptor handles this
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <n-card title="Axios 请求测试">
    <n-space vertical>
      <n-input-group>
        <n-select v-model:value="method" :options="options" :style="{ width: '120px' }" />
        <n-input v-model:value="url" placeholder="输入接口地址" />
        <n-button type="primary" :loading="loading" @click="sendRequest">发送请求</n-button>
      </n-input-group>
      <n-input
        v-model:value="response"
        type="textarea"
        placeholder="响应结果将显示在这里"
        :autosize="{ minRows: 10 }"
        readonly
      />
    </n-space>
  </n-card>
</template>