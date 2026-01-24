<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'

</script>

<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <!-- <HomeHot /> -->
    <!-- <homeProduct /> -->

</template>

<style scoped lang="scss">
.container {
    background-color: white;
    width: 1200px;
    height: 534px;
    position: relative;
    top: 18px;
    border-radius: 20px;
}
</style>