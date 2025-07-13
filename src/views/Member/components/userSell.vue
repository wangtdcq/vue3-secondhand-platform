<script setup>
// tab列表
const tabTypes = [
    { name: "all", label: "全部" },
    { name: "comment", label: "待确认" },
    { name: "complete", label: "已完成" },
    { name: "cancel", label: "已取消" }
]
import { ref, onMounted } from 'vue'


const isshow = ref(false)

//图片
const imageUrl = ref('');
//图片上传实时预览
// const previewImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         imageUrl.value = URL.createObjectURL(file);
//     }
// };
// const handleSuccess = (response) => {
//     imageUrl.value = response.url;
//     ElMessage.success('上传成功');
// }

// const change = () => {
//     message.value = ''
//     number.value = 0
//     ElMessage.success('添加成功')

// }

import total from '@/assets/new.json'
const totalList = ref(total.result)
const number = ref(0)
const itemName = ref('')
const message = ref('')
import { useDataStore } from '@/stores/json';
const store = useDataStore()

const addDate = (newItem) => {

    newItem.picture = imageUrl.value
    console.log(newItem)
    totalList.value.push(newItem)
    imageUrl.value = '';
    itemName.value = '';
    number.value = 0;
    message.value = '';
    isshow.value = false;
    ElMessage.success('添加成功')
    // store.updateData(totalList)
    console.log(newItem.value)

}
</script>

<template>
    <div class="order-container">
        <el-tabs>
            <!-- tab切换 -->
            <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

            <div class="main-container">
                <div class="holder-container" v-if="true">
                    <el-empty description="暂无订单数据" />
                    <button class="add"><i class="iconfont icon-jiahao" @click="isshow = !isshow"></i></button>
                    <div class="layer" v-if="isshow">
                        <div class="content">

                            <div class="numbercontain">
                                <span>确认图片 : </span>
                                <input type="text" placeholder="请输入图片地址" v-model="imageUrl" class="Picture">
                                <span>确认名称 : </span>
                                <input type="text" placeholder="请输入名称" v-model="itemName" class="Name">
                                <span>确认价格 : </span>
                                <input v-model.number="number" type="number" class="Number" placeholder="请输入数字">
                            </div>

                        </div>
                        <div class="input-area">
                            <div class="Icon">
                                <i class="iconfont icon-biaoqing_xiao" id="xiao"></i>
                                <i class="iconfont icon-tupian"></i>
                                <i class="iconfont icon-jianqie"></i>
                            </div>

                            <input placeholder="请描述宝贝" v-model="message">
                            <el-button
                                @click="addDate({ id: Date.now().toString(), name: itemName, price: number.toString(), desc: message })">发送</el-button>
                        </div>


                    </div>
                </div>
                <div v-else>
                    <!-- 订单列表 -->
                    <button class="add"><i class="iconfont icon-jiahao"></i></button>
                    <!-- 分页 -->
                    <div class="pagination-container">
                        <el-pagination background layout="prev, pager, next" />
                    </div>
                </div>
            </div>

        </el-tabs>
    </div>

</template>

<style scoped lang="scss">
.order-container {
    padding: 10px 20px;

    .pagination-container {
        display: flex;
        justify-content: center;
    }

    .main-container {
        min-height: 500px;

        .holder-container {
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;

            .add {
                position: relative;
                left: 350px;
                top: 150px;
                border-radius: 20px;
                background-color: #03dca6;
            }

            .layer {
                position: absolute;

                width: 1300px;
                height: 380px;
                background-color: #f8f8f8;
                z-index: 99;

                .content {
                    height: 200px;
                    width: 600px;
                    border-bottom: 0.5px solid #e9e9e9;
                    position: relative;
                    left: 150px;

                    .numbercontain {
                        height: 200px;
                        position: relative;
                        top: 50px;
                        left: 100px;
                        width: 300px;


                        span {
                            position: relative;

                        }

                        .Picture {
                            width: 230px;
                            height: 30px;
                            border: 0.5px solid #e9e9e9;
                        }

                        .Number {
                            width: 230px;
                            height: 30px;
                            border: 0.5px solid #e9e9e9;
                        }

                        .Name {
                            width: 230px;
                            height: 30px;
                            border: 0.5px solid #e9e9e9;
                        }
                    }


                }

                .input-area {
                    width: 700px;
                    height: 167px;
                    position: relative;
                    left: 180px;

                    .Icon {
                        height: 43px;

                        i {
                            font-size: 28px;
                            margin: 10px;
                        }

                        #xiao {
                            font-size: 33px;
                            position: relative;
                            top: 2px;
                            left: 3px;
                        }
                    }

                    input {
                        border: none;
                        font-size: 16px;
                        width: 300px;
                        background-color: #f8f8f8;
                        outline: none;

                        .Number {
                            position: relative;
                            left: 60px;
                            top: 30px;
                            background-color: #02daa7;
                        }


                    }

                    button {
                        position: relative;
                        top: 60px;
                        left: 490px;
                        width: 90px;
                        height: 35px;
                        border-radius: 40px;
                        background-color: #02daa7;
                        font-size: 16px;
                        letter-spacing: 3px;
                        border: none;
                    }
                }

                button {
                    width: 70px;
                    height: 30px;
                    position: relative;
                    left: 800px;
                    top: 330px;
                    border-radius: 20px;
                    background-color: #03dca6;
                }
            }
        }
    }
}

.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: $xtxColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: $priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }
}
</style>