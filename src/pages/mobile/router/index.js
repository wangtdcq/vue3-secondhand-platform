import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/pages/mobile/views/Layout/index.vue'
const router = createRouter({
  // 使用 Hash 模式,直接就能跑,但不美观
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
    },
    {
      path: '/member',
      component: () =>
        import(/*webpackChunkName:"member" */ '@/pages/mobile/views/Member/index.vue'),
    },
  ],
})
export default router
