<script setup>
import ProSearch from '@/components/ProSearch/index.vue'
import ProCarousel from '@/components/ProCarousel/index.vue'
import { getBannerAPI } from '@/api/home';
import { ref, onMounted } from 'vue'

const keyword = ref('')
const bannerList = ref([]);
const getBanner = async () => {
    const res = await getBannerAPI()
    bannerList.value = res.result
}
onMounted(() => getBanner())
const onSearch = (val) => {
    console.log('调用后端接口搜索:', val);
};

const onBannerClick = (item) => {
    console.log('点击了轮播图:', item.title);
};
</script>
<template>
    <div>CATEGORY
        <div class="home-page">
            <!-- 1. 搜索组件：透传了 clearable 属性 -->
            <ProSearch v-model="keyword" placeholder="搜索二手手机、电脑..." clearable :debounce-time="300" @search="onSearch" />

            <!-- 2. 轮播图组件 -->
            <ProCarousel class="mt-20" :list="bannerList" height="350px" @click="onBannerClick" />
        </div>
    </div>
</template>

<style scoped>
.mt-20 {
    margin-top: 20px;
}
</style>