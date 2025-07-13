<script setup>
import { defineEmits, ref, onMounted } from 'vue'

const flag = ref(0)
const emit = defineEmits(['customEvent'])

function filterPrice(minPrice, maxPrice) {
    const data = { minPrice, maxPrice }
    // console.log(data)
    emit('customEvent', data)
}

onMounted(() => {
    filterPrice(0, 100000)
})
</script>


<template>
    <div class="contain">
        <el-button :class="{ 'active': flag === 0 }" @click="flag = 0; filterPrice(0, 100000)"
            filterPrice>全部</el-button>
        <el-button :class="{ 'active': flag === 1 }" @click="flag = 1; filterPrice(1, 10)" filterPrice>1-10</el-button>
        <el-button :class="{ 'active': flag === 2 }" @click="flag = 2; filterPrice(10, 100)">10-100</el-button>
        <el-button :class="{ 'active': flag === 3 }" @click="flag = 3; filterPrice(100, 1000)">100-1000</el-button>
        <el-button :class="{ 'active': flag === 4 }" @click="flag = 4; filterPrice(1000, 10000)">1000-10000</el-button>
    </div>
</template>

<style scoped lang="scss">
.active {
    color: black;
    background-color: #02daa7;

}
</style>