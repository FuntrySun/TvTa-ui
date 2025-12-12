import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test/axios',
      name: 'test-axios',
      component: () => import('../views/TestAxios.vue')
    },
    {
      path: '/test/notification',
      name: 'test-notification',
      component: () => import('../views/TestNotification.vue')
    },
    {
      path: '/test/pinia',
      name: 'test-pinia',
      component: () => import('../views/TestPinia.vue')
    },
    {
      path: '/test/sys-methods',
      name: 'test-sys-methods',
      component: () => import('../views/TestSysMethods.vue')
    }
  ]
})

export default router