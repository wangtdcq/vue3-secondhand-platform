<script setup>
defineProps({
    title: {
        tyep: String
    },
    subTitle: {
        type: String
    }
})

import HomeFilter from './HomeFilter.vue';

import { defineEmits } from 'vue'

const emit = defineEmits(['grandchildEvent'])

function grandfatherEvent(data) {
    // console.log(data)
    emit('grandchildEvent', data)
}
</script>


<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 主标题和副标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
                <home-filter @grandchildEvent="grandfatherEvent"></home-filter>

            </div>
            <!-- 主体内容区域 -->
            <slot />
        </div>
    </div>
</template>


<style scoped lang='scss'>
.home-panel {
    background-color: #fff;
    position: relative;
    top: 35px;
    left: 34px;
    width: 1200px;

    border-radius: 20px 20px 20px 20px;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;
        position: relative;
        left: 30px;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }

        h4 {
            position: relative;
            left: -110px;
            top: -3px;
        }
    }
}
</style>