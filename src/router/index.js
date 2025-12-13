import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/Layout/index.vue'
// import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
// import Category from '@/views/Category/index.vue'
// import Member from '@/views/Member/index.vue'
// import denglu from '@/views/Login/component/denglu.vue'
// import zhuce from '@/views/Login/component/zhuce.vue'
// import userInfo from '@/views/Member/components/userInfo.vue'
// import userOrder from '@/views/Member/components/userOrder.vue'
// import Details from '@/views/Detail/index.vue'
// import CartList from '@/views/CartList/index.vue'
// import Checkout from '@/views/Checkout/index.vue'
// import FilterPrice from '@/views/Home/components/FilterPrice.vue'
// import FilterTime from '@/views/Home/components/FilterTime.vue'
// import Search from '@/views/Layout/components/Search.vue'
// import Talk from '@/views/Detail/components/Talk.vue'
// import userSell from '@/views/Member/components/userSell.vue'
// import userPublic from '@/views/Member/components/userPublic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
          children: [
            {
              path: '',
              component: () => import('@/views/Home/components/FilterPrice.vue'),
            },
            {
              path: 'filtertime',
              component: () => import('@/views/Home/components/FilterTime.vue'),
            },
          ],
        },
        {
          path: 'Category/:id',
          component: () => import('@/views/Category/index.vue'),
          meta: { requiresAuth: true }, //设定访问权限（只有先登录才能访问）
        },
        {
          path: 'detail/:id',
          component: () => import(/*webpackChunkName:"detail"*/ '@/views/Detail/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'talk',
          component: () =>
            import(/*webpackChunkName:"detail"*/ '@/views/Detail/components/Talk.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'cartlist',
          component: () => import(/*webpackChunkName:"cartlist"*/ '@/views/CartList/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'checkout',
          component: () => import(/*webpackChunkName:"checkout"*/ '@/views/Checkout/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'search',
          component: () =>
            import(/*webpackChunkName:"search"*/ '@/views/Layout/components/Search.vue'),
          props: (route) => ({
            searchParam: route.query.param || '',
          }),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName:"login-group" */ '@/views/Login/index.vue'),
      children: [
        {
          path: '',
          component: () =>
            import(/* webpackChunkName:"login-group" */ '@/views/Login/component/denglu.vue'),
        },
        {
          path: 'zhuce',
          component: () =>
            import(/* webpackChunkName:"login-group" */ '@/views/Login/component/zhuce.vue'),
        },
      ],
    },
    {
      path: '/member',
      component: () => import(/*webpackChunkName:"member-group" */ '@/views/Member/index.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () =>
            import(/*webpackChunkName:"member-group" */ '@/views/Member/components/userInfo.vue'),
        },
        {
          path: 'order',
          component: () =>
            import(
              /*webpackChunkName:member-otherGroup"*/ '@/views/Member/components/userOrder.vue'
            ),
        },
        {
          path: 'shell',
          component: () =>
            import(
              /*webpackChunkName:member-otherGroup"*/ '@/views/Member/components/userSell.vue'
            ),
        },
        {
          path: 'public',
          component: () =>
            import(
              /*webpackChunkName:member-otherGroup"*/ '@/views/Member/components/userPublic.vue'
            ),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    console.log('Token', token)
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

export default router
