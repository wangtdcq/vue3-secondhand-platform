<script setup>
import { ref } from 'vue'
let flag = ref(0)

const filterPrice = (min, max) => {

}
</script>


<template>
    <div class="contain">
        <el-button :class="{ 'active': flag === 1 }" @click="flag = 1">1天前</el-button>
        <el-button :class="{ 'active': flag === 2 }" @click="flag = 2">1月前</el-button>
        <el-button :class="{ 'active': flag === 3 }" @click="flag = 3">1年前</el-button>
    </div>


</template>

<style scoped lang="scss">
.active {
    color: black;
    background-color: #02daa7;

}
</style>