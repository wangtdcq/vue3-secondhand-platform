<script setup>
import HeaderCart from './HeaderCart.vue';

// 搜索栏
import { ref, onMounted, onBeforeUnmount } from 'vue'

const prompts = ["居家", "美食", "服饰", "女式", "个护"];
const currentPrompt = ref(prompts[0]); // 当前显示的文本
const index = ref(0);
let timer = null;
const startPotation = () => {
    timer = setInterval(() => {
        index.value = (index.value + 1) % prompts.length;
        currentPrompt.value = prompts[index.value];
    }, 2000);
}
onBeforeUnmount(() => {
    clearInterval(timer);
})
onMounted(() => {
    startPotation();
})
//

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();


import total from '@/assets/total.json'
const categoryList = ref(total.result)


const searchQuery = ref('')
import { useRouter } from 'vue-router'

const router = useRouter()

const commit = () => {
    router.push({
        path: '/search',
        query: { param: searchQuery.value }
    })
    console.log("转移成功");
}

//防抖应用
import debounce from '@/utils/debounce';
const debouncedSearch = debounce(commit, 1000, true);

//节流-时间戳
function trottle1(func, delay) {
    let callNow = 0;
    return function (...args) {
        const now = Date.now();
        if (now - callNow >= delay) {
            callNow = now;
            func.apply(this, args);
        }
    }
}
//节流-定时器
function trottle2(func, delay) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args);
            }, delay)
        }
    }
}
//节流-综合
function trottle3(func, delay) {
    let callNow = 0;
    let timer = null;
    return function (...args) {
        let now = Date.now();
        let remain = delay - (now - callNow);
        if (remain <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            callNow = now;
            func.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                callNow = Date.now();
                timer = null;
                func.apply(this, args);
            }, remain);
        }
    }
}
//节流-可配置
// function trottle4(func, delay, { leading = true, trailing = true } = {}) {
//     let timer = null;
//     let nowCall = 0;
//     return function (...args) {
//         let now = Date.now();
//         let remaining = delay - (now - nowCall);
//         if (remaining <= 0) {
//             if (timer) {
//                 clearTimeout(timer);
//                 timer = null
//             }
//             nowCall = now;
//             if (leading) {
//                 func.apply(this, args);
//             }
//         } else if (!timer && trailing) {
//             timer = setTimeout(() => {
//                 timer = null;
//                 if (trailing) {
//                     func.apply(this, args)
//                 }
//             })
//         }
//     }
// }

//节流应用

import trottle from '@/utils/trottle';
const trottleSearch = trottle(commit, 1000);
</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">小兔鲜</RouterLink>
            </h1>
            <!-- 搜索栏 -->
            <div class="search">
                <input id="searchBar" type="text" class="input" :placeholder="currentPrompt" v-model="searchQuery"
                    @keyup.enter="commit">
                <button class="button" @click="trottleSearch">
                    <i class=" iconfont icon-sousuo3"></i>
                    <span>搜索</span>
                </button>

            </div>
            <!-- 下边栏导航 -->
            <ul class="header-nav">
                <li class="home" v-for="item in categoryList" :key="item.id">
                    <RouterLink :to="`/category/${item.id}`" active-class="active">{{ item.name }}</RouterLink>
                </li>

            </ul>
            <!-- 区分登录状态和非登录状态 -->
            <template v-if="userStore.userInfo.token">
                <div class="icon">
                    <a href="javascript:;" class="icon-link" @click="$router.push('/member')">
                        <i class=" iconfont icon-denglu"></i>
                        <span>{{ userStore.userInfo.account }}</span>
                    </a>
                    <HeaderCart></HeaderCart>
                </div>
            </template>
            <template v-else>
                <div class="icon">
                    <a href="javascript:;" class="icon-link" @click="$router.push('/login')">
                        <i class=" iconfont icon-denglu"></i>
                        <span>登录/注册</span>
                    </a>
                    <HeaderCart></HeaderCart>
                </div>
            </template>
        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
        height: 97px;
    }

    .logo {
        width: 250px;
        position: absolute;
        left: 68px;

        a {
            display: block;
            height: 90px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/πlogo.png') no-repeat center 2px / contain;
        }
    }

    .header-nav {
        width: 500px;
        display: flex;
        padding-left: 50px;
        position: absolute;
        top: 59px;
        left: 310px;
        z-index: 998;

        li {
            margin-right: 12px;
            width: 38px;
            text-align: center;

            a {
                font-size: 12px;
                line-height: 32px;
                height: 32px;
                display: inline-block;

                &:hover {
                    color: $xtxColor;
                    border-bottom: 1px solid $xtxColor;
                }
            }

            .active {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }

    .search {
        width: 556px;
        height: 40px;
        position: absolute;
        left: 348px;
        top: 17px;
        border: 2.5px solid black;
        border-radius: 50px;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            width: 480px;
            height: 32px;
            padding: 0 15px;
            position: absolute;
            top: 2px;
            border: none;
            border-right: none;
            border-radius: 22px 0 0 22px;
            font-size: 19px;
            outline: none;

        }


        button {
            height: 32px;
            width: 70px;
            position: absolute;
            left: 480px;
            top: 2px;
            background-color: #02daa7;
            border: none;
            border-radius: 22px 22px 22px 22px;
            cursor: pointer;

            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #000;
            transition: background-color 0.2s;

            i {
                font-size: 14px;
                margin-right: 2px;
            }
        }


    }

    .results-list {
        background-color: aqua;
        position: relative;
        left: 450px;
        top: 590px;
        z-index: 99;
    }


    .icon {
        width: 220px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        position: absolute;

        display: flex;
        left: 1000px;
        top: 35px;
        transition: font-weight 0.2s ease;
        /* 平滑过渡 */

        .icon-link {
            margin: 0 27px 0 0;
            display: flex;
            align-items: center;
        }


        span {
            font-size: 13px;
        }

        a:hover {
            font-weight: 600;
        }

        .iconfont {
            font-size: 25px;
            margin: 0 12px 0 0;
            font-weight: 700;
            color: black;
            /* 修改颜色 */
            font-style: normal;
            /* 防止斜体 */
            -webkit-font-smoothing: antialiased;
            /* 抗锯齿 */
        }

    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>