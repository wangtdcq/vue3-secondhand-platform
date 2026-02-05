<script setup>
defineProps({
    title: {
        tyep: String
    },
    subTitle: {
        type: String
    }
})

import { defineEmits } from 'vue'

const emit = defineEmits(['grandchildEvent'])
</script>


<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 主标题和副标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
                <!-- <home-filter @grandchildEvent="grandfatherEvent"></home-filter> -->

            </div>
            <!-- 主体内容区域 -->
            <slot />
        </div>
    </div>
</template>


<style scoped lang='scss'>
.home-panel {
    // 1. 基础容器设置
    background-color: #fff;
    width: 1200px;
    margin: 35px auto 0; // 顶部 35px 间距，左右自动居中
    border-radius: 20px;

    // 2. 核心：锁死盒子模型，让 padding 不再撑开宽度
    box-sizing: border-box;
    overflow: hidden;

    .head {
        box-sizing: border-box; // 锁死宽度为父级的 100% (1200px)
        width: 100%; // 确保不超出

        display: flex;
        align-items: flex-end;

        // 3. 用 padding 实现缩进，不使用 position: relative 和 left
        // 上 40px, 右 30px, 下 40px, 左 30px
        padding: 40px 30px;

        h3 {
            // 删掉 flex: 1，宽度随文字走
            font-size: 32px;
            font-weight: normal;
            margin: 0;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>