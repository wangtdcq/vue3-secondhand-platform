<script setup>

import HomePanel from './HomePanel.vue';
import { ref, computed, watch, onMounted } from 'vue'

import { useDataStore } from '@/stores/json';
const store = useDataStore()


import total from '@/assets/new.json'
const NewList = ref(total.result)
//console.log(NewList.value)
// console.log(NewList.value.length)

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
// 触底监听
onMounted(() => {
    if (!NewList.value.length) {
        console.error("错误：没有从 goods.json 中读取到 result 数组，请检查 json 结构");
    }
    displayList.value.push(...generateFromJSON(20));

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMore();
        }
    }, { threshold: 0.1 });
    if (loadTrigger.value) observer.observe(loadTrigger.value);
});
</script>
<template>
    <HomePanel title="猜你喜欢" sub-title="新鲜出炉 品质靠谱" @grandchildEvent="handleEvent">

        <ul class="goods-list">
            <li v-for="item in displayList" :key="item.uniqueId">
                <RouterLink :to="`/detail/${item.id}`" :commit="FilteredList">
                    <img :src="item.picture" alt="" loading="lazy" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
            <div ref="loadTrigger">{{ loading ? `加载中...` : `下滑加载更多` }}</div>
        </ul>
    </HomePanel>


</template>


<style scoped lang='scss'>
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
</style>