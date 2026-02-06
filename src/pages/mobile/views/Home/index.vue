<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

// --- 基础数据 ---
import total from '@/assets/new.json'
const NewList = ref(total.result)
const displayList = ref([]);
const loading = ref(false);

// --- 核心配置 ---
const COLUMN_COUNT = 1;
const ESTIMATED_HEIGHT = 280;
const bufferCount = 3;

// --- 状态变量 ---
const containerRef = ref(null);  // 滚动容器引用
const itemsRef = ref([]) // 绑定到DOM的ref数组
const scrollTop = ref(0);        // 当前滚动距离
const viewHeight = ref(window.innerHeight); // 可视区

// ---位置缓存数组---
const positions = ref([]);
// 初始化/更新位置缓存
const initPositions = (startIndex = 0) => {
    const newList = [];
    for (let i = startIndex; i < displayList.value.length; i++) {
        const prevBottom = i > 0 ? (newList[i - startIndex - 1]?.bottom || positions.value[i - 1]?.bottom) : 0;
        newList.push({
            index: i,
            height: ESTIMATED_HEIGHT,
            top: prevBottom,
            bottom: prevBottom + ESTIMATED_HEIGHT
        });
    }
    if (startIndex === 0) {
        positions.value = newList;
    } else {
        positions.value = [...positions.value, ...newList];
    }
};
// --- 测量真实高度并更新缓存
const updatePositions = () => {
    if (!itemsRef.value.length) return;

    let accumulatedDiff = 0; // 累加差值，用于修正滚动条跳动
    const currentStartIndex = startIndex.value;

    // 按照 DOM 顺序测量当前可见的这批元素
    itemsRef.value.forEach((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const index = +node.dataset.index;
        const oldHeight = positions.value[index].height;
        const dValue = rect.height - oldHeight;

        // 如果真实高度与缓存高度不符
        if (dValue !== 0) {
            // 修正当前项
            positions.value[index].height = rect.height;
            positions.value[index].bottom = positions.value[index].top + rect.height;

            // 连锁反应：修正该项之后所有项的 top 和 bottom
            // 即使有 10 万条数据，这里的纯数学计算在 JS 中也极快 (1-2ms)
            for (let j = index + 1; j < positions.value.length; j++) {
                positions.value[j].top = positions.value[j - 1].bottom;
                positions.value[j].bottom = positions.value[j].top + positions.value[j].height;
            }

            /**
             * 【漏洞修复 1：解决向上滚动跳变】
             * 如果当前测量的项在视口上方 (index < startIndex)，
             * 它高度的变化会撑开或压缩上方的空间，导致当前视口内容“闪跳”。
             * 我们记录这个差值，最后通过手动滚动补偿回来。
             */
            if (index < currentStartIndex) {
                accumulatedDiff += dValue;
            }
        }
    });

    // 如果上方元素高度变了，立刻修正滚动位置，抵消视觉上的位移
    if (accumulatedDiff !== 0) {
        window.scrollTo(0, window.scrollY + accumulatedDiff);
    }
};
// --- 二分查找起始索引 ---
const getStartIndex = (st = 0) => {
    let start = 0;
    let end = positions.value.length - 1;
    let tempIndex = null;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let midValue = positions.value[mid].bottom;
        if (midValue === st) return mid + 1;
        if (midValue < st) {
            start = mid + 1;
        } else {
            if (tempIndex === null || mid < tempIndex) tempIndex = mid;
            end = mid - 1;
        }
    }
    return tempIndex || 0;
};

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
            // name: "内容".repeat(Math.floor(Math.random() * 50) + 10)
        });
    }
    return result;
};

// --- 虚拟列表核心计算 ---
// 存储容器距离页面顶部的距离
const containerOffsetTop = ref(0);
// 在挂载和窗口变化时更新这个距离
const updateContainerOffset = () => {
    if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        containerOffsetTop.value = rect.top + scrollTop;
    }
};
// 计算当前可视范围的起始索引
const startIndex = computed(() => {
    const relativeScrollTop = Math.max(0, scrollTop.value - containerBaseTop.value);
    const idx = getStartIndex(relativeScrollTop);
    return Math.max(0, idx - bufferCount);
})

// 计算当前可视范围的结束索引
const endIndex = computed(() => {
    const viewBottom = scrollTop.value + viewHeight.value;
    let end = startIndex.value;
    // 找到第一个底部超出视口的项
    while (end < positions.value.length && positions.value[end].bottom < viewBottom) {
        end++;
    }
    return Math.min(displayList.value.length, end + bufferCount);
});

// 最终渲染的数据切片
const visibleList = computed(() => {
    return displayList.value.slice(startIndex.value, endIndex.value).map((item, idx) => ({
        ...item,
        _realIndex: startIndex.value + idx
    }))
})

const totalHeight = computed(() => {
    if (!positions.value.length) return 0;
    return positions.value[positions.value.length - 1].bottom;
})

// 列表区域的位移偏移量
const offset = computed(() => {
    if (startIndex.value >= positions.value.length) return 0;
    return positions.value[startIndex.value].top;
});
const containerBaseTop = ref(0);
// 滚动处理，触底加载 
const handleScroll = (e) => {
    const target = e.target;
    const currentScrollTop = target === document ? window.scrollY : target.scrollTop;
    scrollTop.value = currentScrollTop;

    console.log('实际滚动距离:', scrollTop.value);

    // 触底加载逻辑也要相应调整（基于 target）
    const scrollHeight = target === document ? document.documentElement.scrollHeight : target.scrollHeight;
    const clientHeight = target === document ? window.innerHeight : target.clientHeight;
    if (scrollHeight - (currentScrollTop + clientHeight) < 300 && !loading.value) {
        loadMore();
    }
}

const handleResize = () => {
    viewHeight.value = window.innerHeight;
    // 重置所有位置缓存为预估值，因为宽度变化后旧高度不再准确
    initPositions(0);
    // 触发下一次 tick 的重新测量
    nextTick(() => updatePositions());
};


// 无限追加
const loadMore = () => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(() => {
        const oldLen = displayList.value.length;
        const newItems = generateFromJSON(20);
        displayList.value.push(...newItems);
        initPositions(oldLen); // 只追加新数据的预估位置
        loading.value = false;
    }, 300);
};

watch(visibleList, () => {
    nextTick(() => {
        updatePositions();
    });
}, { deep: true });

const setItemRef = (el) => {
    if (el) itemsRef.value.push(el);
}
watch(visibleList, () => { itemsRef.value = [] });


onMounted(() => {
    // 初始化首屏数据
    displayList.value.push(...generateFromJSON(40));
    initPositions(0);
    nextTick(() => {
        updateContainerOffset();
    })

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', () => {
        handleResize();
        updateContainerOffset();
    });
    // 暴露给 window 方便控制台调试，增加10000条数据
    window.addDate = () => {
        displayList.value.push(...generateFromJSON(10000));
        console.log('已手动增加10000条数据，当前总数：', displayList.value.length);
    }
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('resize', handleResize);
})


</script>


<template>
    <div class="home-page">
        <!-- 顶部标题 -->
        <header class="nav-bar">首页</header>

        <!-- 模拟轮播图 -->
        <div class="banner">
            <div class="banner-content">Banner Area</div>
        </div>

        <!-- 模拟列表内容 -->
        <div class="section-title">热门推荐</div>

        <div class="virtual-container" ref="containerRef">

            <!-- 撑开高度的占位元素 -->
            <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

            <!-- 实际渲染的内容区域 -->
            <ul class="goods-list" :style="{ transform: `translateY(${offset}px)` }">
                <li v-for="item in visibleList" :key="item.uniqueId" :ref="setItemRef" :data-index="item._realIndex">
                    <div class="item-link">
                        <!-- 左侧图片 -->
                        <img :src="item.picture" alt="" />

                        <!-- 右侧文字内容容器 -->
                        <div class="info">
                            <p class="name">{{ item.name }}</p>
                            <p class="desc">{{ item.desc }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </div>
                    </div>
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

    </div>
</template>

<style scoped lang="scss">
.home-page {
    padding-top: 44px;
    /* 留出顶部导航高度 */
}

.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #fff;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 100;
}

.banner {
    margin: 15px;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 10px rgba(118, 75, 162, 0.3);
}

.section-title {
    padding: 0 15px;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.list {
    padding: 0 15px;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
}

.card-img {
    width: 80px;
    height: 80px;
    background: #eee;
    border-radius: 4px;
}

.card-info h3 {
    margin: 0 0 5px 0;
    font-size: 14px;
}

.card-info p {
    margin: 0;
    font-size: 12px;
    color: #999;
}

.virtual-container {
    // height: 800px;
    // overflow-y: auto;
    position: relative;
    width: 100%;
    min-height: 1px;

}

// 占位元素：负责撑开滚动条
.phantom {
    position: absolute;
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
    left: 0;
    top: 0;
    display: flex;
    flex-wrap: wrap; // 允许换行
    // gap: 20px;
    // row-gap: 10px;
    width: 96%;

    li {
        width: 100%;
        padding: 15px; // 稍微增加内边距
        box-sizing: border-box;
        min-height: auto; // 去掉之前的 400px，让高度随内容自适应
        background: #f0f9f4;
        margin-bottom: 10px;
        border-radius: 8px;

        // 设置链接为弹性盒模型
        .item-link {
            display: flex;
            align-items: center; // 垂直方向居中对齐
            text-decoration: none;
        }

        img {
            width: 120px; // 设置固定的图片宽度
            height: 120px; // 设置固定的图片高度
            object-fit: contain; // 保持图片比例
            background: #fff;
            border-radius: 4px;
            flex-shrink: 0; // 防止图片被挤压
        }

        .info {
            flex: 1; // 占据右侧剩余所有空间
            padding-left: 20px; // 文字与图片之间的间距
            display: flex;
            flex-direction: column; // 文字垂直排列
            justify-content: center;
        }

        p {
            font-size: 16px;
            padding: 0;
            margin: 4px 0; // 控制行间距
            text-align: left; // 改为左对齐
        }

        .name {
            font-weight: bold;
            color: #333;
            font-size: 18px;
        }

        .desc {
            font-size: 14px;
            color: #666;
        }

        .price {
            color: #cf4444; // 假设这是你的价格颜色
            font-size: 20px;
            margin-top: 8px;
            font-weight: bold;
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