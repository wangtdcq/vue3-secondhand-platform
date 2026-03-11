# 🛒 二手π —— 校园二手交易平台 (Campus Second-hand Trading Platform)

![Vue.js](https://img.shields.io/badge/Vue.js-3.X-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State-FFD000?logo=databricks&logoColor=white)

## 📖 项目简介

“二手π”是一个专为高校学生打造的二手商品交易平台，涵盖商品发布、智能搜索、购物车及个人中心等完整业务闭环。
项目基于 `Vue3` + `TypeScript` + `Vite` 现代化前端工程架构构建，并在移动端适配、复杂组件通信及长列表渲染性能上进行了深度优化。

## ✨ 核心亮点 (Core Features)

### 🚀 极致性能优化：不定高度虚拟瀑布流
针对首页复杂的“商品瀑布流”长列表场景，本项目**从零独立研发**了不定高度的虚拟瀑布流组件，解决了传统瀑布流 DOM 节点过多导致的卡顿问题：
- **精准高度预测：** 采用离屏 DOM 预测量结合 `onload` 异步技术，精准获取图文真实高度。
- **动态多列布局：** 配合**贪心算法**实现瀑布流多列动态均衡布局。
- **GPU 渲染加速：** 利用 `transform: translate3d` 开启 GPU 加速可视区与 Buffer 缓冲区节点，将全局 DOM 节点数严格控制在常数级。
- **图片预解码缓存：** 建立基于 `new Image()` 的内存解码缓存机制，彻底解决节点复用引起的图片闪烁问题，实现 **60FPS 丝滑滚动体验**。

### 📱 多端响应式适配
针对校园用户高频使用的移动端场景，采用 `PostCSS-pxtorem` 结合 CSS `Media Query` (媒体查询) 技术，实现了优雅的多端响应式布局，保证 PC 与移动端均有良好的视觉体验。

### 🛡️ 稳健的网络层与权限控制
- 深度封装 `Axios`，配置统一的请求/响应拦截器。
- 集中处理全局异常与 Token 无感校验。
- 结合 Vue Router 路由守卫，实现严密的登录鉴权与页面访问控制。

### 📦 现代化的状态管理
全面拥抱 `Pinia` 替代 Vuex，实现高度模块化的状态管理与数据持久化，优雅地解决了购物车、用户中心等多组件间的复杂状态流转与通信问题。

## 🛠️ 技术栈 (Tech Stack)

- **核心框架:** Vue 3 (Composition API)
- **构建工具:** Vite
- **开发语言:** TypeScript / JavaScript
- **UI 组件库:** Element-Plus
- **状态管理:** Pinia
- **网络请求:** Axios
- **CSS 预处理器:** SCSS / PostCSS

## ⚙️ 本地运行 (Getting Started)

```bash
# 克隆项目
git clone https://github.com/你的用户名/仓库名.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
