<script setup>
import HomePanel from './HomePanel.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue'

// --- 基础数据 ---
import total from '@/assets/new.json'
const NewList = ref(total.result)
const displayList = ref([]);
const loading = ref(false);

// --- 核心配置 ---
const COLUMN_COUNT = 4;
const itemHeight = 400;
const bufferCount = 3;

// --- 状态变量 ---
const containerRef = ref(null);  // 滚动容器引用
const scrollTop = ref(0);        // 当前滚动距离
const viewHeight = ref(window.innerHeight); // 可视区


// --- 数据生成逻辑 ---
// // 从 JSON 中生成数据
const generateFromJSON = (count) => {
    const result = [];
    const sourceLen = NewList.value.length;

    const baseIndex = displayList.value.length;
    for (let i = 0; i < count; i++) {
        const templateItem = NewList.value[i % sourceLen];
        result.push({
            ...templateItem,
            uniqueId: `uid-${baseIndex + i}-${Date.now()}`,
        });
    }
    return result;
};

// --- 虚拟列表核心计算 ---
// 总行数
const totalRow = computed(() => {
    return Math.ceil(displayList.value.length / COLUMN_COUNT)
})

// 总高度（用于撑开全局滚动条）= 所有数据加起来的总行数 * 行高
const totalHeight = computed(() => {
    return totalRow.value * itemHeight;
});

// 计算当前可视范围(考虑缓冲区)
const startRow = computed(() => {
    // 减去容器距离顶部的距离
    const offsetTop = containerRef.value?.offsetTop || 0;
    const relativeScrollTop = Math.max(0, scrollTop.value - offsetTop);
    const row = Math.floor(relativeScrollTop / itemHeight);
    return Math.max(0, row - bufferCount);
})

// 计算当前可视范围的起始索引
const startIndex = computed(() => {
    return startRow.value * COLUMN_COUNT;
})

// 计算当前可视范围的结束索引
const endIndex = computed(() => {
    const visibleRow = Math.ceil(viewHeight.value / itemHeight);
    const endRow = startRow.value + visibleRow + (bufferCount * 2);
    return Math.min(displayList.value.length, endRow * COLUMN_COUNT);
})

// 最终渲染的数据切片
const visibleList = computed(() => {
    const start = startIndex.value;
    const end = endIndex.value;
    return displayList.value.slice(start, end);
})

// 列表区域的位移偏移量
// 计算列表相对于顶部的偏移量（必须严格等于 startRow 的高度）
// 解决空白，必须让列表跟着滚动条走，否则它会滑出视野变成空白
const offset = computed(() => {
    return startRow.value * itemHeight;
});

// 滚动处理，触底加载 
const handleScroll = () => {
    if (!containerRef.value) return;

    scrollTop.value = window.scrollY;

    // 触底判断：当 window 滚动到底部附近时
    const scrollBottom = window.scrollY + window.innerHeight;
    const containerBottom = document.documentElement.scrollHeight

    // 触底判断
    if (containerBottom - scrollBottom < 200 && !loading.value) {
        loadMore();
    }
}

// 无限追加
const loadMore = () => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(() => {
        const newItems = generateFromJSON(20);
        displayList.value.push(...newItems);
        loading.value = false;

        // 调试：打印一下当前总高度，看有没有增加
        console.log('当前数据总量:', displayList.value.length);
        console.log('计算出的总高度:', totalHeight.value);
    }, 500);
};

onMounted(() => {
    // 初始化首屏数据
    displayList.value.push(...generateFromJSON(20));
    window.addEventListener('scroll', handleScroll);
    // 暴露给 window 方便控制台调试，增加10000条数据
    window.addDate = () => {
        displayList.value.push(...generateFromJSON(10000));
        console.log('已手动增加10000条数据，当前总数：', displayList.value.length);
    }
})

// onMounted(() => {
//     viewHeight.value = window.innerHeight;
//     loadMore();

//     // 初始执行一次，用于计算初始状态
//     handleScroll();
// })
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})

</script>
<template>
    <HomePanel title="猜你喜欢" sub-title="新鲜出炉 品质靠谱" @grandchildEvent="handleEvent">
        <div class="virtual-container" ref="containerRef">

            <!-- 撑开高度的占位元素 -->
            <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

            <!-- 实际渲染的内容区域 -->
            <ul class="goods-list" :style="{ transform: `translateY(${offset}px)` }">
                <li v-for="item in visibleList" :key="item.uniqueId">
                    <RouterLink :to="`/detail/${item.id}`" :commit="FilteredList">
                        <img :src="item.picture" alt="" loading="lazy" />
                        <p class="name">{{ item.name }}</p>
                        <p class="price">&yen;{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>

            <!-- 加载状态 -->
            <div class="loading-state">
                <div v-if="loading" class="loading-content">
                    <div class="spinner"></div>
                    <span class="text">正在努力加载中...</span>
                </div>
                <div v-else class="text-hint">上拉加载更多</div>
            </div>
        </div>

    </HomePanel>


</template>


<style scoped lang='scss'>
// 视口容器必须固定高度，且 overflow 为 auto
.virtual-container {
    // height: 800px;
    // overflow-y: auto;

    position: relative;
    width: 100%;
    overflow: visible;

}

// 占位元素：负责撑开滚动条
.phantom {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

// 列表样式
.goods-list {
    display: flex;
    // justify-content: space-between;
    // height: 406px;
    position: absolute; // 配合 transform 使用
    left: 5px;
    top: -10px;
    display: flex;
    flex-wrap: wrap; // 允许换行
    // gap: 20px;
    // row-gap: 10px;
    width: 96%;

    li {
        width: 25%; // 一行4个商品，对应 COLUMN_COUNT = 4
        height: 400px; // 必须和 itemHeight 一致

        background: #f0f9f4;
        // transition: all .5s;
        padding: 10px;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 100%;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}

.loading-state {
    /* 关键：让内容水平和垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    /* 给足够的高度，避免闪烁 */
    height: 60px;
    width: 100%;
    padding: 10px 0;

    /* 可选：加个浅背景区分 */
    // background-color: #f8f9fa;
}

.loading-content {
    display: flex;
    align-items: center;
    gap: 8px;
    /* 图标和字的间距 */
}

/* 旋转的圆环 */
.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #e1e1e1;
    /* 浅灰色底环 */
    border-top: 2px solid #1890ff;
    /* 蓝色旋转头 */
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    /* 旋转动画 */
}

.text {
    font-size: 13px;
    color: #666;
}

.text-hint {
    font-size: 12px;
    color: #999;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>