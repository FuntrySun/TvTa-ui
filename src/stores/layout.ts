import { defineStore } from 'pinia'
import { ref } from 'vue'

export type LayoutType = 'sider' | 'top'

export const useLayoutStore = defineStore('layout', () => {
  const currentLayout = ref<LayoutType>('sider')

  function setLayout(layout: LayoutType) {
    currentLayout.value = layout
  }

  return { currentLayout, setLayout }
})