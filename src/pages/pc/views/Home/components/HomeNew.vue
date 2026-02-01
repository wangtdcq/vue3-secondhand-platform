<script setup>

import HomePanel from './HomePanel.vue';
import { ref, computed, onMounted } from 'vue'

import { useDataStore } from '@/stores/json';
const store = useDataStore()

const Maxprice = ref(0)
const Minprice = ref(0)
function handleEvent(data) {
    //接收参数包含的数据
    Maxprice.value = data.maxPrice
    Minprice.value = data.minPrice
    //console.log('this', Maxprice.value, Minprice.value)
}

const FilteredList = computed(() => {
    const sortedList = [...NewList.value]
    const minPrice = parseFloat(Minprice.value);
    const maxPrice = parseFloat(Maxprice.value);
    //二分搜索找到下界
    let low = 0, high = sortedList.length;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (parseFloat(sortedList[mid].price) < minPrice) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    const lowerBound = low;
    //二分搜索找到上界
    low = 0, high = sortedList.length;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (parseFloat(sortedList[mid].price) <= maxPrice) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    const upperBound = low;
    //通过上下界切割原函数
    return sortedList.slice(lowerBound, upperBound);
})

import total from '@/assets/new.json'
import { translate } from 'element-plus';

const NewList = ref(total.result)
//console.log(NewList.value)
// console.log(NewList.value.length)

// --- 基础数据 ---
const displayList = ref([]);
const loading = ref(false);
const loadTrigger = ref(null);

// 从 JSON 中生成数据
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
// 无限追加
const loadMore = () => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(() => {
        const newItems = generateFromJSON(20);
        displayList.value.push(...newItems);
        loading.value = false;
    }, 500);
};
// 暴力增加2000条
const addMassiveData = () => {
    const massiveitems = generateFromJSON(20000);
    displayList.value.push(...massiveitems);
    console.log('已手动增加20000条数据，当前总数：', displayList.value.length);
};
onMounted(() => {
    window.addDate = addMassiveData;
    // 初始化数据
    displayList.value.push(...generateFromJSON(20));
    // 获取容器高度
    if (containerRef.value) {
        viewHeight.value = containerRef.value.clientHeight
    }
})
// 触底监听
// onMounted(() => {
//     displayList.value.push(...generateFromJSON(20));

//     const observer = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//             loadMore();
//         }
//     }, { threshold: 0.1 });
//     if (loadTrigger.value) observer.observe(loadTrigger.value);
// });

// --- 虚拟列表配置 --- 
const containerRef = ref(null);  // 滚动容器引用
const itemHeight = 300;          // 固定每行高度
const viewHeight = ref(800);     // 可视区域高度
const scrollTop = ref(0);        // 当前滚动距离
const bufferCount = 5;           // 缓冲数量（防止滑动过快白屏）
// 计算总高度（占位高度）
const totalHeight = computed(() => displayList.value.length * itemHeight);

// 计算当前可视范围的起始索引
const startIdedx = computed(() => {
    return Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferCount)
})

// 计算当前可视范围的结束索引
const endIndex = computed(() => {
    return Math.min(
        displayList.value.length,
        Math.floor((scrollTop.value + viewHeight.value) / itemHeight) + bufferCount
    )
})

// 最终渲染的数据切片
const visibleList = computed(() => {
    return displayList.value.slice(startIdedx.value, endIndex.value).map((item, index) => ({
        ...item,
        top: (startIdedx.value + index) * itemHeight
    }))
})

// 滚动处理  
const onScroll = computed((e) => {
    const target = e.target;
    scrollTop.value = target.scrollTop;
    // 触底判断：滚动到底部剩余 200px 时加载更多
    if (target.scrollTop + target.clientHeight >= target.scrollTop - 200) {
        loadMore();
    }
})

</script>
<template>
    <HomePanel title="猜你喜欢" sub-title="新鲜出炉 品质靠谱" @grandchildEvent="handleEvent">
        <div class="virtual-container" ref="containerRef" @scroll="onScroll">
            <!-- 撑开高度的占位元素 -->
            <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

            <!-- 实际渲染的内容区域 -->
            <ul class="goods-list">
                <li v-for="item in displayList" :key="item.uniqueId"
                    :style="{ height: itemHeight + 'px', transform: `translateY(${item.top}px)` }">
                    <RouterLink :to="`/detail/${item.id}`" :commit="FilteredList">
                        <img :src="item.picture" alt="" loading="lazy" />
                        <p class="name">{{ item.name }}</p>
                        <p class="price">&yen;{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>

            <!-- 加载状态 -->
            <div class="loading-state" :style="{ transform: `translateY(${totalHeight}px)` }">
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
.virtual-container {
    height: 800px;
    overflow-y: auto;
    position: relative;
    width: 100%;
}

.phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.goods-list {
    display: flex;
    // justify-content: space-between;
    // height: 406px;
    position: relative;
    left: 20px;
    top: -10px;
    display: flex;
    flex-wrap: wrap;
    // gap: 20px;
    row-gap: 10px;

    li {
        width: 293px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 290px;
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