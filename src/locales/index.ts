import { createI18n, useI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import en from './en'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: import.meta.env.VITE_DEFAULT_LOCALE || 'zh-CN', // 默认语言
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    en
  }
})

export default i18n

export const supportLanguages = [
  { label: '简体中文', key: 'zh-CN' },
  { label: 'English', key: 'en' }
]

export function setLanguage(locale: string) {
  if (i18n.mode === 'legacy') {
    (i18n.global.locale as any).value = locale
  } else {
    (i18n.global.locale as any).value = locale
  }
}

export function getLanguage() {
  return i18n.global.locale
}

/**
 * 封装的 t 方法，用于 setup 中
 */
export const t = (key: string) => {
  return i18n.global.t(key)
}

/**
 * Hook 形式，如果需要响应式能力推荐使用这个
 */
export const useAppI18n = () => {
  return useI18n()
}
