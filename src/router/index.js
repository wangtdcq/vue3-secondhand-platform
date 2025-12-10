import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Member from '@/views/Member/index.vue'
import denglu from '@/views/Login/component/denglu.vue'
import zhuce from '@/views/Login/component/zhuce.vue'
import userInfo from '@/views/Member/components/userInfo.vue'
import userOrder from '@/views/Member/components/userOrder.vue'
import Details from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import FilterPrice from '@/views/Home/components/FilterPrice.vue'
import FilterTime from '@/views/Home/components/FilterTime.vue'
import Search from '@/views/Layout/components/Search.vue'
import Talk from '@/views/Detail/components/Talk.vue'
import userSell from '@/views/Member/components/userSell.vue'
import userPublic from '@/views/Member/components/userPublic.vue'

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
              component: FilterPrice,
            },
            {
              path: 'filtertime',
              component: FilterTime,
            },
          ],
        },
        {
          path: 'Category/:id',
          component: Category,
          meta: { requiresAuth: true }, //设定访问权限（只有先登录才能访问）
        },
        {
          path: 'detail/:id',
          component: Details,
          meta: { requiresAuth: true },
        },
        {
          path: 'talk',
          component: Talk,
          meta: { requiresAuth: true },
        },
        {
          path: 'cartlist',
          component: CartList,
          meta: { requiresAuth: true },
        },
        {
          path: 'checkout',
          component: Checkout,
          meta: { requiresAuth: true },
        },
        {
          path: 'search',
          component: Search,
          props: (route) => ({
            searchParam: route.query.param || '',
          }),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      component: Login,
      children: [
        {
          path: '',
          component: denglu,
        },
        {
          path: 'zhuce',
          component: zhuce,
        },
      ],
    },
    {
      path: '/member',
      component: Member,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: userInfo,
        },
        {
          path: 'order',
          component: userOrder,
        },
        {
          path: 'shell',
          component: userSell,
        },
        {
          path: 'public',
          component: userPublic,
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
