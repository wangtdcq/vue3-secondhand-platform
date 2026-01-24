import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/pages/mobile/views/Layout/index.vue'
import Home from '@/pages/mobile/views/Home/index.vue'
const router = createRouter({
  // 使用 Hash 模式,直接就能跑,但不美观
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '首页' },
        },
        {
          path: 'member',
          name: 'Member',
          component: () => import('@/pages/mobile/views/Member/index.vue'),
          meta: { title: '用户中心' },
        },
      ],
    },
  ],
})
export default router
