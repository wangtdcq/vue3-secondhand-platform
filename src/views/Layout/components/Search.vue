<script setup>
import total from '@/assets/new.json'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = ref(route.query.param || '')
// 监听路由参数变化
watch(() => route.query.param, (newVal) => {
    searchQuery.value = newVal || ''
})

const NewList = ref(total.result)

//字符串匹配算法
function fuzzySearch(items, query) {
    //转换为小写
    query = query.toLowerCase();
    //遍历items数组中的每个元素
    return items.filter(item => {
        const name = item.name.toLowerCase();
        let queryIndex = 0;
        //将items数组中的元素与query字符串进行匹配
        for (let i = 0; i < name.length; i++) {
            if (name[i] === query[queryIndex]) {
                queryIndex++;
                if (queryIndex === query.length) return true;
            }
        }
        return false;
    });
}
const filterItems = computed(() => {
    return searchQuery.value
        ? fuzzySearch(NewList.value, searchQuery.value)
        : NewList.value;
});
</script>

<template>

    <ul class="goods-list">
        <li v-for="item in filterItems" :key="item.id">
            <RouterLink :to="`/detail/${item.id}`">
                <img v-img-lazy="item.picture" alt="" />
                <p class="name">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
        </li>
    </ul>


</template>

<style scoped lang="scss">
.goods-list {
    display: flex;
    // justify-content: space-between;
    // height: 406px;
    position: relative;
    left: 110px;
    top: 30px;
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