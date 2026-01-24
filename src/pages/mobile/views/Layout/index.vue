<template>
    <div class="mobile-layout">
        <!-- 移动端头部 -->
        <mobile-header :active-index="activeIndex" @menu-toggle="toggleMenu" @search-toggle="toggleSearch" />

        <!-- 主要内容区域 -->
        <main class="mobile-main-content">
            <slot></slot>
        </main>

        <!-- 移动端页脚 -->
        <mobile-footer />
    </div>
</template>

<script>
import MobileHeader from '@/pages/mobile/views/Layout/components/MobileHeader.vue';
import MobileFooter from '@/pages/mobile/views/Layout/components/MobileFooter.vue';

export default {
    name: 'MobileLayout',
    components: {
        MobileHeader,
        MobileFooter
    },
    data() {
        return {
            activeIndex: '/'
        };
    },
    watch: {
        $route(to) {
            this.activeIndex = to.path;
        }
    },
    mounted() {
        this.activeIndex = this.$route.path;
    },
    methods: {
        toggleMenu() {
            // 通知子组件切换菜单状态
            this.$emit('menu-toggle');
        },
        toggleSearch() {
            // 通知子组件切换搜索状态
            this.$emit('search-toggle');
        }
    }
};
</script>

<style scoped>
.mobile-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.mobile-main-content {
    flex: 1;
    padding: 15px;
    background-color: #f8f8f8;
}
</style>