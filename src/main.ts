import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import i18n, { t } from '@/locales'
import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// 挂载全局 $t 方法，虽然 vue-i18n 插件已经自动挂载了 $t，但为了符合用户要求显式二次封装
app.config.globalProperties.$t = t

app.mount('#app')