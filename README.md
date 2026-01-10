# 🥧 二手π (Second-hand Pi) —— 校园二手交易平台

> 基于 Vue3 + Vite + Element-Plus 打造的高性能校园二手交易平台。

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.x-409EFF?style=flat-square&logo=element-plus)
![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD11B?style=flat-square&logo=pinia)

## 📖 项目介绍

**二手π** 是一个专为高校学生设计的二手物品交易平台。旨在解决校园内部闲置物品流转困难的问题，提供商品发布、智能搜索、购物车管理及个人中心等全流程服务，打造安全、便捷的校园交易闭环。

## ✨ 主要功能模块

- 🛍️ **商品展示**：首页推荐、分类浏览。
- 🔍 **智能搜索**：支持关键词搜索，快速定位所需物品。
- 📝 **商品发布**：学生可上传闲置物品信息（图片、描述、价格）。
- 🛒 **购物车**：商品收藏与批量结算。
- 👤 **个人中心**：订单管理、个人信息维护、发布的商品管理。

## 🛠️ 技术栈

- **核心框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/) (配合持久化插件)
- **网络请求**: [Axios](https://axios-http.com/)
- **CSS 预处理**: SCSS

## 💡 技术亮点与架构设计

本项目在开发过程中注重**工程化规范**与**性能体验**，主要包含以下技术实践：

### 1. 工程架构与封装

- **Composition API**: 全面使用 Vue3 组合式 API 开发，逻辑复用性更强。
- **Element-Plus 二次封装**: 针对通用业务组件进行二次封装，统一 UI 风格，显著提升开发效率。
- **Axios 深度封装**:
  - 配置全局请求/响应拦截器。
  - 统一处理 Token 校验、网络超时及全局异常提示。

### 2. 路由与权限控制

- **路由守卫**: 结合全局路由钩子实现登录鉴权与页面访问控制（RBAC 模型基础）。
- **性能优化**: 实施路由懒加载（Lazy Loading），配合魔法注释（Magic Comments）进行代码分包，减小首屏体积。

### 3. 性能深度优化

- **首屏加载**: 采用 Intersection Observer API 实现图片懒加载，减少带宽消耗。
- **交互优化**: 封装防抖（Debounce）与节流（Throttle）工具函数，优化搜索框输入及表单提交等高频事件，防止重复请求。
- **构建优化**: 配置 Vite 构建策略，开启 Tree Shaking 及代码压缩，产出最优包体积。

### 4. 状态管理

- 使用 **Pinia** 替代 Vuex，实现模块化的状态管理。
- 配置数据持久化策略，解决页面刷新导致的状态丢失问题，处理多组件间的复杂通信。
