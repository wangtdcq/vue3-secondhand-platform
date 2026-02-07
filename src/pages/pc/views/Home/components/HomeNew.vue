<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
// 导入本地 JSON 文件
import total from '@/assets/new.json'
import HomePanel from './HomePanel.vue'

// --- 1. 配置参数 ---
const COLUMN_COUNT = 4
const UPPER_BUFFER = 5000    // 上滑缓冲区
const LOWER_BUFFER = 1500    // 下滑缓冲区
const PAGE_SIZE = 20         // 每次“无限”加载的数量

// --- 2. 状态存储 ---
const displayList = ref([])
const scrollTop = ref(0)
const viewHeight = ref(window.innerHeight)
const loading = ref(false)

const heightCache = new Map()
const imgHeightCache = new Map()
const decodedImageCache = new Map()
const positions = ref([])
const preMeasureList = ref([])
const offscreenRef = ref(null)

// --- 3. 布局排版算法 ---
const refreshLayout = (list) => {
    const count = list.length
    if (count === 0) return []
    const newPositions = new Array(count)
    const columnHeights = new Array(COLUMN_COUNT).fill(0)
    const colWidth = 100 / COLUMN_COUNT

    for (let i = 0; i < count; i++) {
        const minH = Math.min(...columnHeights)
        const colIndex = columnHeights.indexOf(minH)

        // 必须基于 uniqueId 获取，因为无限滚动中原始 id 会重复
        const h = heightCache.get(list[i].uniqueId) || 200
        newPositions[i] = {
            top: minH,
            left: (colIndex * colWidth) + '%',
            height: h,
            bottom: minH + h
        }
        columnHeights[colIndex] += h
    }
    return newPositions
}

// --- 4. 离屏预测量（实现真正“无感”加载的核心） ---
const doPreMeasure = async (newData) => {
    preMeasureList.value = newData
    await nextTick()

    const container = offscreenRef.value
    const items = container.querySelectorAll('.pre-item')

    const promises = Array.from(items).map((node, i) => {
        const img = node.querySelector('img')
        const id = newData[i].uniqueId

        return new Promise(resolve => {
            const handleRecord = () => {
                const rect = node.getBoundingClientRect()
                const imgRect = img.getBoundingClientRect()
                heightCache.set(id, rect.height)
                imgHeightCache.set(id, imgRect.height)

                // 内存锁定图片位图，防止上滑时内存释放导致的闪烁
                const memImg = new Image()
                memImg.src = newData[i].picture
                decodedImageCache.set(id, memImg)
                resolve()
            }
            if (img.complete) handleRecord()
            else { img.onload = handleRecord; img.onerror = resolve }
        })
    })

    await Promise.all(promises)
    displayList.value.push(...newData)
    // 更新全量布局
    positions.value = refreshLayout(displayList.value)
    preMeasureList.value = []
}

// --- 5. 无限滚动逻辑：随机抽取商品 ---
const loadMore = async () => {
    if (loading.value) return
    loading.value = true

    // 模拟网络请求时间
    await new Promise(resolve => setTimeout(resolve, 600))

    const sourceData = total.result
    // 从本地文件中随机抽取 PAGE_SIZE 个商品
    const rawData = Array.from({ length: PAGE_SIZE }).map(() => {
        const randomIndex = Math.floor(Math.random() * sourceData.length)
        const item = sourceData[randomIndex]

        return {
            ...item,
            // 关键：必须生成全新的 uniqueId，否则无限滚动时 Key 会碰撞
            uniqueId: `${item.id}-${Math.random().toString(36).slice(2, 9)}`
        }
    })

    // 进入离屏测量流程
    await doPreMeasure(rawData)

    loading.value = false
}

// --- 6. 虚拟列表计算 ---
const visibleList = computed(() => {
    if (positions.value.length === 0) return []
    const start = scrollTop.value - UPPER_BUFFER
    const end = scrollTop.value + viewHeight.value + LOWER_BUFFER

    return displayList.value.map((item, index) => ({
        ...item,
        _pos: positions.value[index]
    })).filter(item => {
        if (!item._pos) return false
        return item._pos.bottom > start && item._pos.top < end
    })
})

const totalHeight = computed(() => {
    return positions.value.length ? Math.max(...positions.value.map(p => p.bottom)) : 0
})

const handleScroll = () => {
    scrollTop.value = window.scrollY
    // 距离底部还有 1200px 时自动加载
    if (document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) < 1200) {
        loadMore()
    }
}

onMounted(() => {
    loadMore()
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    // 清理内存缓存
    decodedImageCache.clear()
})
</script>

<template>
    <HomePanel title="猜你喜欢" subTitle="肯定是你喜欢的">
        <div class="waterfall-container">
            <!-- 1. 离屏测量：用户看不见，用于提前计算高度 -->
            <div class="offscreen-container" ref="offscreenRef">
                <div v-for="item in preMeasureList" :key="'pre' + item.uniqueId" class="pre-item"
                    :style="{ width: (100 / COLUMN_COUNT) + '%' }">
                    <div class="goods-card">
                        <div class="img-wrap"><img :src="item.picture" /></div>
                        <div class="desc-wrap">
                            <p class="name">{{ item.name }}</p>
                            <p class="desc-text">{{ item.desc }}</p>
                            <p class="price">¥{{ item.price }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. 正式瀑布流列表 -->
            <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>
            <ul class="list-wrapper">
                <li v-for="item in visibleList" :key="item.uniqueId" :style="{
                    width: (100 / COLUMN_COUNT) + '%',
                    transform: `translate3d(0, ${item._pos.top}px, 0)`,
                    left: item._pos.left,
                    height: item._pos.height + 'px'
                }">
                    <div class="goods-card">
                        <RouterLink :to="`/detail/${item.id}`">
                            <div class="img-wrap" :style="{ height: imgHeightCache.get(item.uniqueId) + 'px' }">
                                <img :src="item.picture" decoding="sync" />
                            </div>
                            <div class="desc-wrap">
                                <p class="name">{{ item.name }}</p>
                                <p class="desc-text">{{ item.desc }}</p>
                                <p class="price">¥{{ item.price }}</p>
                            </div>
                        </RouterLink>

                    </div>
                </li>
            </ul>

            <!-- 3. 浅绿色无限加载动画 -->
            <div class="loading-footer">
                <div v-if="loading" class="load-status">
                    <div class="spinner"></div>
                    <span>努力加载中...</span>
                </div>
                <div v-else class="infinite-tip">~ 向上滑动探索更多 ~</div>
            </div>
        </div>
    </HomePanel>

</template>

<style scoped>
/* 离屏容器：确保宽度一致以便准确测量折行 */
.offscreen-container {
    position: absolute;
    top: -20000px;
    left: 0;
    width: 100%;
    visibility: hidden;
    pointer-events: none;
}

.pre-item {
    float: left;
    padding: 4px;
    box-sizing: border-box;
}

.waterfall-container {
    position: relative;
    width: 100%;
    background: #f5f8f6;
    min-height: 100vh;
}

.phantom {
    width: 100%;
    pointer-events: none;
}

.list-wrapper {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
}

.list-wrapper li {
    position: absolute;
    padding: 4px;
    box-sizing: border-box;
    will-change: transform;
    transition: none;
}

.goods-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.img-wrap {
    width: 100%;
    background: #f0f0f0;
    overflow: hidden;
}

.img-wrap img {
    width: 100%;
    display: block;
    height: auto;
}

.desc-wrap {
    padding: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 12px;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
    height: 2.8em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;
}

.desc-text {
    font-size: 11px;
    color: #99a59e;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.price {
    color: #42b983;
    /* 浅绿色 */
    font-weight: bold;
    font-size: 14px;
    margin-top: auto;
}

/* 浅绿色加载动画样式 */
.loading-footer {
    padding: 50px 0;
    text-align: center;
    color: #a2b0a9;
    font-size: 12px;
}

.load-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e0f2f1;
    border-top-color: #42b983;
    /* 浅绿色指示 */
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.infinite-tip {
    opacity: 0.5;
    letter-spacing: 1px;
}
</style>