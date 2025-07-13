<script setup>

import HomePanel from './HomePanel.vue';
import { ref, computed, watch } from 'vue'

import { useDataStore } from '@/stores/json';
const store = useDataStore()


import total from '@/assets/new.json'
const NewList = ref(total.result)
console.log(NewList.value)

const Maxprice = ref(0)
const Minprice = ref(0)
function handleEvent(data) {
    //接收参数包含的数据
    Maxprice.value = data.maxPrice
    Minprice.value = data.minPrice
    console.log('this', Maxprice.value, Minprice.value)
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

</script>
<template>
    <HomePanel title="猜你喜欢" sub-title="新鲜出炉 品质靠谱" @grandchildEvent="handleEvent">

        <ul class="goods-list">
            <li v-for="item in FilteredList" :key="item.id">
                <RouterLink :to="`/detail/${item.id}`" :commit="FilteredList">
                    <img v-img-lazy="item.picture" alt="" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
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