<script setup>
import { ref, reactive } from 'vue'

const sentmessage = ref('')
const message = reactive({
    list: []
});
const Message = ref([])

const msg = () => {
    if (sentmessage.value.trim()) {
        // 将 input 的值添加到响应式对象的 list 中
        message.list.push(sentmessage.value);
        // 清空输入框
        sentmessage.value = '';
    }
    console.log(message.value.list)
}
const Msg = () => {
    if (sentmessage.value.trim()) {
        Message.value.push({
            content: sentmessage.value,
            timestamp: new Date().toTimeString().slice(0, 5)
        });
        sentmessage.value = ''
    }
    console.log(Message.value)
}

const handleEnter = (e) => {
    if (!e.isComposing && !e.shiftKey) {
        e.preventDefault();
        Msg();
    }
}
</script>


<template>
    <div class="container">
        <!-- 聊天头部 -->
        <div class="header">

            <h3>Trump</h3>

        </div>

        <!-- 消息区域 -->
        <div class="message">
            <div class="talk">
                <ul>
                    <li v-for="(message, index) in Message" :id="index">
                        <div class="time">{{ message.timestamp }}</div>
                        <div class="char-right">

                            <div class="avatar"><img src="@/assets/images/avatar1.jpg"></div>
                            <div class="content">
                                <span>
                                    {{ message.content }}
                                </span>
                            </div>

                        </div>
                    </li>
                </ul>
                <!-- <div class="time">17:00</div>
                <div class="char-right">
                    <div class="avatar"><img src="@/assets/images/avatar1.jpg"></div>
                    <div class="content">
                        <span>
                            我不好afriaoref
                        </span>
                    </div>

                </div> -->

            </div>

        </div>

        <!-- 输入区域 -->
        <div class="input-area">
            <div class="Icon">
                <i class="iconfont icon-biaoqing_xiao" id="xiao"></i>
                <i class="iconfont icon-tupian"></i>
                <i class="iconfont icon-jianqie"></i>
            </div>
            <input placeholder="请输入信息，按Enter键发送" v-model="sentmessage" @keydown="Msg">
            <button @click="Msg">发送</button>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {

    width: 700px;
    flex-direction: column;
    background-color: #f8f8f8;

    .header {
        height: 68px;
        width: 100%;
        border-bottom: 0.5px solid #e9e9e9;

        h3 {
            position: relative;
            top: 22px;
            left: 30px;
        }
    }

    .message {
        height: 300px;
        width: 100%;
        border-bottom: 0.5px solid #e9e9e9;

        .talk {
            li {

                .time {
                    font-size: 12px;
                    text-align: center;
                }



                .char-right {
                    display: flex;
                    // flex-direction: column;
                    // position: relative;
                    // left: 400px;

                    flex-direction: column;
                    /* 取消注释，启用纵向布局 */
                    align-items: flex-end;
                    /* 关键修改：子元素右对齐 */
                    width: 100%;
                    /* 确保父容器宽度占满 */

                    .content {
                        padding: 7px;

                        max-width: fit-content;
                        // margin-left: auto;
                        position: relative;
                        top: 5px;

                        span {


                            text-align: center;
                            padding: 10px;
                            background-color: white;
                            border: 1px solid black;
                            border-radius: 5px;
                        }
                    }

                    .avatar {
                        width: 50px;
                        height: 26px;



                        img {
                            width: 100%;
                            height: auto;
                        }

                    }
                }

            }

        }

    }

    .input-area {

        height: 167px;

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
            width: 100%;
            background-color: #f8f8f8;
            outline: none;


        }

        button {
            position: relative;
            top: 60px;
            left: 930px;
            width: 90px;
            height: 35px;
            border-radius: 40px;
            background-color: #02daa7;
            font-size: 16px;
            letter-spacing: 3px;
            border: none;
        }
    }
}
</style>