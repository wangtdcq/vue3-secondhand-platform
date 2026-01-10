<!-- src/components/ProCarousel/index.vue -->
<template>
    <div class="pro-carousel" :style="{ borderRadius: radius }">
        <el-carousel v-bind="$attrs" :height="height" :trigger="trigger">
            <el-carousel-item v-for="(item, index) in list" :key="item.id || index" @click="handleItemClick(item)"
                class="cursor-pointer">
                <!-- 使用 el-image 优化图片加载体验 -->
                <el-image :src="item.imgUrl" :alt="item.title" fit="cover" class="carousel-img" loading="lazy">
                    <!-- 图片加载失败时的兜底显示 -->
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>

                <!-- 标题遮罩层 -->
                <div v-if="item.title" class="carousel-title">
                    {{ item.title }}
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>

// JS版 Props 定义
const props = defineProps({
    /**
     * 轮播数据列表
     * 结构要求: { id, imgUrl, title?, link? }
     */
    list: {
        type: Array,
        default: () => [], // 数组必须用函数返回
        required: true
    },
    height: {
        type: String,
        default: '300px'
    },
    trigger: {
        type: String,
        default: 'click', // 默认点击切换，防止鼠标划过乱闪
        validator: (value) => ['click', 'hover'].includes(value) // 增加校验器
    },
    radius: {
        type: String,
        default: '8px'
    }
});

const emits = defineEmits(['click']);

// 统一跳转处理
const handleItemClick = (item) => {
    // 如果有链接，这里可以处理路由跳转
    if (item.link) {
        console.log('自动跳转到:', item.link);
        // router.push(item.link)
    }
    // 抛出事件给父组件
    emits('click', item);
};
</script>

<style scoped>
.pro-carousel {
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.carousel-img {
    width: 100%;
    height: 100%;
    display: block;
}

.cursor-pointer {
    cursor: pointer;
}

.carousel-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 8px 16px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
}
</style>