// src/pages/mobile/main.js
import { createApp } from 'vue'
// ⚠️ 引入的是同级目录下的 mobile/App.vue，千万别引入外层根目录的 App.vue
import App from './App.vue'
// ⚠️ 引入同级目录下的路由
import router from './router'
import '@/styles/main.css' // 全局样式

const app = createApp(App)

app.use(router) // 挂载移动端路由
app.mount('#app') // 挂载到 mobile.html 里的 <div id="app">
