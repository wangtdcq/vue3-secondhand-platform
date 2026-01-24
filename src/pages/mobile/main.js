// src/pages/mobile/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vant from 'vant' // 移动端常用 UI 库
// import 'vant/lib/index.css'
// import 'amfe-flexible' // 如果你使用 rem 适配方案，需要引入这个
import { createPinia } from 'pinia'

import './styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(Vant)

app.mount('#app') // 挂载到 mobile.html 的 <div id="app">
