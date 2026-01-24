<template>
    <div class="app-layout">
        <!-- 内容区域：使用 router-view 显示 Home 或 Member -->
        <div class="page-content">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>

        <!-- 底部导航栏 -->
        <div class="tab-bar">
            <router-link to="/home" class="tab-item" active-class="active">
                <div class="icon">🏠</div> <!-- 这里可以用图片或Icon组件替换 -->
                <span class="text">主页</span>
            </router-link>

            <router-link to="/member" class="tab-item" active-class="active">
                <div class="icon">👤</div>
                <span class="text">用户中心</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
// Layout 不需要复杂的逻辑，主要是结构
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f7f8fa;
}

.page-content {
    flex: 1;
    overflow-y: auto;
    /* 内容溢出滚动 */
    padding-bottom: 50px;
    /* 防止内容被底部栏遮挡 */
}

.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    /* 底部栏高度 */
    background: #ffffff;
    border-top: 1px solid #ebedf0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    padding-bottom: env(safe-area-inset-bottom);
    /* 适配 iPhone X 等底部横条 */
}

.tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #646566;
    font-size: 12px;
    flex: 1;
    height: 100%;
}

.tab-item .icon {
    font-size: 20px;
    margin-bottom: 2px;
}

/* 选中状态样式 */
.tab-item.active {
    color: #1989fa;
    /* 主题色 */
}

/* 简单的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>