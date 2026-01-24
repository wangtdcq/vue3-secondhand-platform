<!-- src/pages/mobile/App.vue -->
<template>
    <div id="mobile-app">
        <!-- 移动端通常直接显示路由内容 -->
        <!-- 很多移动端项目需要缓存列表页，可以使用 router-view 的插槽写法 -->
        <!-- <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view> -->
        <router-view></router-view>
    </div>
</template>

<script setup>
// 这里可以做一些移动端的初始化，比如禁止缩放等逻辑
</script>

<style>
/* 移动端全局样式重置 */
body {
    margin: 0;
    padding: 0;
    /* 解决移动端点击高亮问题 */
    -webkit-tap-highlight-color: transparent;
    background-color: #f5f5f5;
    /* 常见移动端背景色 */
}

#mobile-app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 750px;
    /* 限制最大宽度，防止在 iPad 上拉得太长 */
    margin: 0 auto;
}
</style>