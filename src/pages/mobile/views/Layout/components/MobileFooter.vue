<template>
    <footer class="mobile-footer">
        <!-- 底部导航栏 -->
        <nav class="mobile-footer-nav" v-if="showBottomNav">
            <div class="nav-item" v-for="item in navItems" :key="item.index" @click="handleNavSelect(item.index)">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </div>
        </nav>

        <!-- 页脚信息 -->
        <div class="mobile-footer-content">
            <div class="mobile-footer-info">
                <p>© 2023 公司名称 版权所有</p>
                <p>备案号：XXXXXXXXXX</p>
            </div>
            <div class="mobile-footer-links">
                <a href="#">隐私政策</a>
                <a href="#">使用条款</a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Props
const props = defineProps({
    showBottomNav: {
        type: Boolean,
        default: true
    }
});

// 响应式数据
const navItems = ref([
    { index: '/', title: '首页', icon: 'el-icon-house' },
    { index: '/product', title: '产品', icon: 'el-icon-goods' },
    { index: '/solution', title: '方案', icon: 'el-icon-office-building' },
    { index: '/news', title: '新闻', icon: 'el-icon-news' },
    { index: '/contact', title: '联系', icon: 'el-icon-phone-outline' }
]);

// 方法
const handleNavSelect = (index) => {
    router.push(index);
};
</script>

<style scoped>
.mobile-footer {
    background: #f5f5f5;
    margin-top: 20px;
}

/* 底部导航栏 */
.mobile-footer-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-top: 1px solid #eee;
    padding: 8px 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
}

.nav-item i {
    font-size: 18px;
    margin-bottom: 2px;
}

.nav-item.active,
.nav-item:hover {
    color: #409EFF;
}

/* 移动端页脚信息 */
.mobile-footer-content {
    padding: 15px;
    text-align: center;
}

.mobile-footer-info p {
    margin: 5px 0;
    color: #666;
    font-size: 12px;
}

.mobile-footer-links {
    margin-top: 10px;
}

.mobile-footer-links a {
    color: #666;
    text-decoration: none;
    margin: 0 8px;
    font-size: 12px;
}
</style>