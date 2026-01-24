import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 使用 Hash 模式,直接就能跑,但不美观
  history: createWebHashHistory(),
  routes: [],
})
export default router
