<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['grandchildEvent'])

function handleChildEvent(data) {
    emit('grandchildEvent', data)
}
</script>

<template>
    <div class="filter">
        <a class="curr" href="javascript:;">

            <span>筛选</span>
            <i class="iconfont icon-shaixuan1"></i>
        </a>
        <div class="layer">
            <div class="list">
                <div class="left">

                    <RouterLink to="/">价格区间</RouterLink>

                    <RouterLink to="/filtertime">发布时间</RouterLink>

                </div>
                <div class="right">
                    <router-view @customEvent="handleChildEvent"></router-view>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
.filter {
    position: relative;
    left: -150px;


    &:hover {
        font-weight: 600;

        .layer {
            opacity: 1;
            transform: none;
            z-index: 99
        }
    }

    .layer {
        transition: all 0.4s 0.2s;
        transform: translateY(-200px) scale(1, 0);
        width: 1000px;
        height: 400px;
        position: absolute;
        top: 50px;
        right: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background: #fff;
        border-radius: 4px;
        padding-top: 10px;

        &::before {
            content: "";
            position: absolute;
            right: 14px;
            top: -10px;
            width: 20px;
            height: 20px;
            background: #fff;
            transform: scale(0.6, 1) rotate(45deg);
            box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
        }

        .list {
            margin-right: 20px;
            border-radius: 2px;
            background-color: #fff;

            .left {
                width: 250px;
                height: 270px;
                font-size: 18px;
                font-weight: 400;
                padding: 20px 52px 5px;
                background-color: #f5f5f5;

            }

            a {
                display: block;
                line-height: 1;
                padding: 15px 0;
                font-size: 14px;
                color: #666;
                position: relative;

                &:hover {
                    color: $xtxColor;
                }

                &.active,
                &.router-link-exact-active {
                    color: $xtxColor;

                    &:before {
                        display: block;
                    }
                }

                &:before {
                    content: '';
                    display: none;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    position: absolute;
                    top: 19px;
                    left: -16px;
                    background-color: $xtxColor;
                }
            }

            .right {
                position: relative;
                top: -250px;
                left: 300px;
            }
        }
    }
}
</style>