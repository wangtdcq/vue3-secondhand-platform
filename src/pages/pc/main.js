import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/pages/pc/router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/common.scss'

// const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// app.use(pinia)
// app.use(router)

// app.mount('#app')
// src/main.js (或 main.jsx)
async function enableMocking() {
  const { worker } = await import('@/mocks/brower.js')

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}

enableMocking().then(() => {
  // 渲染逻辑
  createApp(App).use(pinia).use(router).mount('#app')
})
