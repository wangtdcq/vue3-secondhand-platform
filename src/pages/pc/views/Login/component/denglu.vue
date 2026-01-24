<script setup>
import { inject } from 'vue'
const form = inject('globalForm')
const formRef = inject('globalRef')
const doLogin = inject('DoLogin')
</script>


<template>
    <div class="account-box">
        <div class="form">
            <el-form label-position="right" label-width="60px" status-icon :model="form" ref="formRef">
                <el-form-item label="账户" prop="account">
                    <el-input v-model="form.account" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item label-width="22px" prop="agree">
                    <el-checkbox size="large" v-model="form.agree">
                        我已同意隐私条款和服务条款
                    </el-checkbox>
                </el-form-item>
                <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $xtxColor;
    width: 100%;
    color: #fff;
}
</style>