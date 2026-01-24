<template>
    <header class="mobile-header">
        <div class="mobile-header-content">
            <!-- 菜单按钮 -->
            <div class="menu-toggle" @click="toggleMenu">
                <i class="el-icon-menu"></i>
            </div>

            <!-- Logo -->
            <div class="logo" @click="goHome">
                <img src="@/assets/images/logo.png" alt="" />
            </div>

            <!-- 搜索按钮 -->
            <div class="search-toggle" @click="toggleSearch">
                <i class="el-icon-search"></i>
            </div>
        </div>

        <!-- 移动端菜单 -->
        <transition name="slide">
            <div v-show="showMenu" class="mobile-menu">
                <el-menu :default-active="currentActiveIndex" class="mobile-el-menu" @select="handleSelect" router>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/product">产品中心</el-menu-item>
                    <el-menu-item index="/solution">解决方案</el-menu-item>
                    <el-menu-item index="/news">新闻中心</el-menu-item>
                    <el-menu-item index="/about">关于我们</el-menu-item>
                    <el-menu-item index="/contact">联系我们</el-menu-item>
                </el-menu>
            </div>
        </transition>

        <!-- 移动端搜索框 -->
        <transition name="fade">
            <div v-show="showSearch" class="mobile-search">
                <el-input v-model="searchValue" placeholder="请输入搜索内容" suffix-icon="el-icon-search"
                    @keyup.enter.native="performSearch"></el-input>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Props
const props = defineProps({
    activeIndex: {
        type: String,
        default: '/'
    }
});

// 响应式数据
const showMenu = ref(false);
const showSearch = ref(false);
const searchValue = ref('');
const currentActiveIndex = ref('/');

// 监听 props 变化
watch(
    () => props.activeIndex,
    (newVal) => {
        currentActiveIndex.value = newVal;
    }
);

// 事件发射
const emit = defineEmits(['menu-toggle', 'search-toggle']);

// 方法
const toggleMenu = () => {
    showMenu.value = !showMenu.value;
    // 关闭搜索框
    showSearch.value = false;
    emit('menu-toggle');
};

const toggleSearch = () => {
    showSearch.value = !showSearch.value;
    // 关闭菜单
    showMenu.value = false;
    emit('search-toggle');
};

const handleSelect = (key) => {
    currentActiveIndex.value = key;
    router.push(key);
    // 关闭菜单
    showMenu.value = false;
};

const goHome = () => {
    router.push('/');
};

const performSearch = () => {
    console.log('执行搜索:', searchValue.value);
    // 执行搜索逻辑
    showSearch.value = false;
};
</script>

<style scoped>
.mobile-header {
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 999;
}

.mobile-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 60px;
}

.menu-toggle,
.search-toggle {
    font-size: 20px;
    cursor: pointer;
    color: #333;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo img {
    height: 40px;
    cursor: pointer;
}

/* 移动端菜单 */
.mobile-menu {
    background: #fff;
    border-top: 1px solid #eee;
    max-height: 400px;
    overflow-y: auto;
}

.mobile-el-menu {
    border: none;
    width: 100%;
}

.mobile-el-menu .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
}

/* 移动端搜索框 */
.mobile-search {
    padding: 10px 15px;
    background: #f5f5f5;
    border-top: 1px solid #eee;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>