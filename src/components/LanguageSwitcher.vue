<script setup lang="ts">
import { setLanguage, supportLanguages } from '@/locales'

const handleSelect = (key: string) => {
  setLanguage(key)
}
</script>

<template>
  <n-dropdown trigger="hover" :options="supportLanguages" @select="handleSelect" style="border-radius: 16px;">
    <button class="icon-btn i-carbon-language text-xl" title="切换语言" />
  </n-dropdown>
</template>