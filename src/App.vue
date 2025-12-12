<script setup lang="ts">
import { zhCN, dateZhCN, enUS, dateEnUS, darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useLayoutStore } from '@/stores/layout'
import MainLayout from '@/layouts/MainLayout.vue'
import TopMenuLayout from '@/layouts/TopMenuLayout.vue'

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
const { locale } = useI18n()

const theme = computed(() => themeStore.isDark ? darkTheme : null)
const naiveLocale = computed(() => locale.value === 'zh-CN' ? zhCN : enUS)
const naiveDateLocale = computed(() => locale.value === 'zh-CN' ? dateZhCN : dateEnUS)
</script>

<template>
  <n-config-provider :locale="naiveLocale" :date-locale="naiveDateLocale" :theme="theme">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <component :is="layoutStore.currentLayout === 'sider' ? MainLayout : TopMenuLayout" />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>