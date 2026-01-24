<script setup>
// import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

// const router = useRouter();
const userStore = useUserStore();

// // 检查用户是否登录
// const isLogin = computed(() => !!userStore.userInfo);

// // 跳转到登录页面
// const goToLogin = () => {
//   router.push('/login');
// };

// // 退出登录
// const logout = () => {
//   userStore.$reset();
//   router.push('/');
// };
</script>

<template>
    <div class="mobile-member">
        <!-- 头部 -->
        <header class="member-header">
            <div class="header-title">个人中心</div>
        </header>

        <!-- 用户信息区域 -->
        <section class="user-info-section" v-if="isLogin">
            <div class="user-avatar">
                <img :src="userStore.userInfo?.avatar || '@/assets/images/default-avatar.png'" alt="头像">
            </div>
            <div class="user-name">{{ userStore.userInfo?.account || '用户名' }}</div>
            <div class="logout-btn" @click="logout">退出登录</div>
        </section>

        <!-- 未登录提示 -->
        <section class="login-prompt" v-else>
            <div class="prompt-content">
                <div class="login-text">您还未登录</div>
                <button class="login-btn" @click="goToLogin">立即登录</button>
            </div>
        </section>

        <!-- 功能导航 -->
        <nav class="member-nav">
            <div class="nav-item" @click="$router.push('/member/order')">
                <div class="nav-icon">
                    <i class="iconfont icon-dingdan"></i>
                </div>
                <div class="nav-text">我的订单</div>
            </div>
            <div class="nav-item" @click="$router.push('/member/public')">
                <div class="nav-icon">
                    <i class="iconfont icon-fabu"></i>
                </div>
                <div class="nav-text">我发布的</div>
            </div>
            <div class="nav-item" @click="$router.push('/member/sell')">
                <div class="nav-icon">
                    <i class="iconfont icon-shouye"></i>
                </div>
                <div class="nav-text">我卖出的</div>
            </div>
        </nav>

        <!-- 设置选项 -->
        <div class="settings-section">
            <div class="setting-item" @click="$router.push('/member/profile')">
                <i class="iconfont icon-shezhi"></i>
                <span>个人资料</span>
            </div>
            <div class="setting-item" @click="$router.push('/member/address')">
                <i class="iconfont icon-address"></i>
                <span>地址管理</span>
            </div>
            <div class="setting-item" @click="$router.push('/member/security')">
                <i class="iconfont icon-anquanshezhi"></i>
                <span>安全设置</span>
            </div>
        </div>

        <!-- 底部导航 -->
        <footer class="mobile-footer">
            <div class="footer-item" @click="$router.push('/')">
                <i class="iconfont icon-shouye"></i>
                <span>首页</span>
            </div>
            <div class="footer-item" @click="$router.push('/category')">
                <i class="iconfont icon-fenlei"></i>
                <span>分类</span>
            </div>
            <div class="footer-item active" @click="$router.push('/member')">
                <i class="iconfont icon-huiyuan"></i>
                <span>会员</span>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.mobile-member {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 60px; // 为底部导航留出空间

    .member-header {
        height: 44px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .header-title {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .user-info-section {
        background: linear-gradient(to bottom, #ff6b6b, #ff8e53);
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;

        .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.5);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .user-name {
            margin-top: 10px;
            font-size: 18px;
            font-weight: 500;
        }

        .logout-btn {
            margin-top: 15px;
            padding: 5px 15px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            font-size: 14px;
        }
    }

    .login-prompt {
        background: linear-gradient(to bottom, #ff6b6b, #ff8e53);
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .prompt-content {
            text-align: center;
            color: white;

            .login-text {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .login-btn {
                background-color: transparent;
                border: 1px solid white;
                color: white;
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 16px;
            }
        }
    }

    .member-nav {
        display: flex;
        background: #fff;
        margin: 15px 15px 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .nav-item {
            flex: 1;
            padding: 20px 0;
            text-align: center;
            cursor: pointer;

            .nav-icon {
                font-size: 24px;
                margin-bottom: 5px;
                color: #ff6b6b;

                .iconfont {
                    font-size: 24px;
                }
            }

            .nav-text {
                font-size: 14px;
                color: #333;
            }
        }
    }

    .settings-section {
        background: #fff;
        margin: 15px 15px 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .setting-item {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #f5f5f5;
            cursor: pointer;

            &:last-child {
                border-bottom: none;
            }

            .iconfont {
                font-size: 18px;
                margin-right: 15px;
                color: #ff6b6b;
                width: 20px;
            }

            span {
                font-size: 16px;
                color: #333;
            }
        }
    }

    .mobile-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: #fff;
        display: flex;
        border-top: 1px solid #eee;

        .footer-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #666;
            cursor: pointer;

            &.active {
                color: #ff6b6b;

                .iconfont {
                    color: #ff6b6b;
                }
            }

            .iconfont {
                font-size: 20px;
                margin-bottom: 2px;
            }
        }
    }
}
</style>