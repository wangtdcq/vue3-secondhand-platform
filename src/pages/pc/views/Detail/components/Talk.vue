<script setup lang="ts">
import TalkDetail from './TalkDetail.vue';

</script>

import TalkDetail from '@/views/Detail/components/TalkDetail'
<template>
    <div class="container">
        <TalkDetail></TalkDetail>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    width: 1000px;

    background-color: f8f8f8;
    border-radius: 20px;

    .header {
        height: 60px;
        border-bottom: 1px solid black;

        span {
            font-size: 19px;
            font-weight: 500;
            position: relative;
            top: 15px;
            left: 15px;
        }
    }

    .message {
        width: 300px;
        background-color: #ffffff;
    }
}
</style>