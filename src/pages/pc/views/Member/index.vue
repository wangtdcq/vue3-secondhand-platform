<script setup>
import LayoutFooter from '../Layout/components/LayoutFooter.vue';
import HeaderCart from '../Layout/components/HeaderCart.vue';
</script>

<template>
    <div class="header">
        <h1 class="logo">
            <RouterLink to="/">二手π</RouterLink>

        </h1>
        <div class="icon">
            <a href="javascript:;" class="icon-link">
                <i class=" iconfont icon-denglu"></i>
                <span>用户</span>
            </a>
            <HeaderCart></HeaderCart>
        </div>
    </div>
    <div class="container">
        <div class="xtx-member-aside">
            <div class="user-manage">
                <h4>我的账户</h4>
                <div class="links">
                    <RouterLink to="/member/">个人中心</RouterLink>
                </div>
                <h4>我的交易</h4>
                <div class="links">
                    <RouterLink to="/member/order">我买到的</RouterLink>
                    <RouterLink to="/member/public">我发布的</RouterLink>
                    <RouterLink to="/member/shell">我卖出的</RouterLink>
                </div>
            </div>
        </div>
        <div class="article">
            <RouterView></RouterView>
        </div>

    </div>
    <LayoutFooter></LayoutFooter>
</template>

<style scoped lang="scss">
.header {
    background: #fff;
    height: 80px;

    .logo {
        width: 250px;
        position: absolute;
        left: 68px;
        top: -5px;

        a {
            display: block;
            height: 90px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/newlogo.webp') no-repeat center 2px / contain;
            position: absolute;
            left: 80px;
        }
    }

    .icon {
        width: 220px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        position: absolute;

        display: flex;
        left: 1035px;
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
}

.container {
    display: flex;
    padding-top: 20px;

    .xtx-member-aside {
        width: 220px;
        margin-right: 20px;
        border-radius: 2px;
        background-color: #fff;

        .user-manage {
            background-color: #fff;

            h4 {
                font-size: 18px;
                font-weight: 400;
                padding: 20px 52px 5px;
                border-top: 1px solid #f6f6f6;
            }

            .links {
                padding: 0 52px 10px;
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
        }
    }

    .article {
        width: 1000px;
        background-color: #fff;
    }


}
</style>