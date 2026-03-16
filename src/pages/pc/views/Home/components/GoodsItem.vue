<script setup lang="ts">
import type { Goods } from '@/types/goods';
// defineProps({
//     goods: {
//         type: Object,
//         default: () => { }
//     }
// })
const props = withDefaults(defineProps<{
    goods?: Goods
}>(), {
    goods: () => ({
        id: '',
        name: '商品名称',
        desc: '商品描述',
        price: '0.00',
        picture: '',
        orderNum: 0
    })
})

</script>

<template>
    <RouterLink to="/" class="goods-item">
        <img :src="props.goods.picture" alt="" />
        <p class="name ellipsis">{{ props.goods.name }}</p>
        <p class="desc ellipsis">{{ props.goods.desc }}</p>
        <p class="price">&yen;{{ props.goods.price }}</p>
    </RouterLink>
</template>


<style scoped lang="scss">
.goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    transition: all .5s;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
        width: 160px;
        height: 160px;
    }

    p {
        padding-top: 10px;
    }

    .name {
        font-size: 16px;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: $priceColor;
        font-size: 20px;
    }
}
</style>