<script setup>
import { ref, onMounted, nextTick } from 'vue'

const sentmessage = ref('')
const chatBody = ref(null)

const messageList = ref([
    {
        role: 'bot',
        type: 'product',
        content: '米面粮油 - 压榨葵花籽油 5L',
        price: '19.00',
        status: '待下单',
        image: 'https://img.js.design/assets/smartFill/img341164da74a810.jpg',
        timestamp: '14:20'
    },
    {
        role: 'bot',
        type: 'text',
        content: '您好！我是π选管家小派。您刚才查看的这款葵花籽油采用物理压榨工艺，目前下单立减并送100积分。请问还有什么可以帮您？',
        timestamp: '14:20'
    },
    {
        role: 'user',
        type: 'text',
        content: '这款油什么时候到期？',
        timestamp: '14:25'
    },
    {
        role: 'user',
        type: 'text',
        content: '你好',
        timestamp: '10:46'
    }
]);

const scrollToBottom = async () => {
    await nextTick();
    if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight;
}

const sendMsg = () => {
    if (!sentmessage.value.trim()) return;
    messageList.value.push({
        role: 'user',
        type: 'text',
        content: sentmessage.value,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    sentmessage.value = '';
    scrollToBottom();
}

onMounted(() => scrollToBottom());
</script>

<template>
    <div class="page-wrapper">
        <!-- 背景装饰 -->
        <div class="bg-decoration">
            <div class="grid-pattern"></div>
            <div class="big-pi">π</div>
        </div>

        <!-- 聊天主窗口 -->
        <div class="chat-main-window">
            <!-- 左侧侧边栏 -->
            <div class="side-bar">
                <div class="side-title">最近咨询</div>
                <div class="contact-item active">
                    <div class="pi-avatar">π</div>
                    <div class="contact-info">
                        <div class="name">π 选管家 - 小派</div>
                        <div class="status">在线</div>
                    </div>
                </div>
            </div>

            <!-- 右侧聊天区 -->
            <div class="chat-content-area">
                <div class="chat-top-bar">
                    <div class="user-id">
                        <strong>π 选管家 - 小派</strong>
                        <span class="dot"></span>
                        <span class="online-text">在线</span>
                    </div>
                    <div class="top-tool">订单查询</div>
                </div>

                <!-- 消息滚动区 -->
                <div class="messages-container" ref="chatBody">
                    <div v-for="(msg, index) in messageList" :key="index" :class="['msg-wrapper', msg.role]">

                        <!-- 机器人头像：仅在 bot 消息时显示在左侧 -->
                        <div class="avatar bot-style" v-if="msg.role === 'bot'">π</div>

                        <div class="msg-body">
                            <!-- 商品卡片 -->
                            <div v-if="msg.type === 'product'" class="product-info-card">
                                <div class="img-box">
                                    <img :src="msg.image" />
                                </div>
                                <div class="text-box">
                                    <div class="p-name">{{ msg.content }}</div>
                                    <div class="p-price-row">
                                        <span class="price">¥{{ msg.price }}</span>
                                        <span class="tag">{{ msg.status }}</span>
                                    </div>
                                    <button class="order-btn">立即下单</button>
                                </div>
                            </div>

                            <!-- 普通文本气泡 -->
                            <div v-else class="text-bubble">
                                {{ msg.content }}
                            </div>
                            <!-- 时间戳 -->
                            <div class="msg-time">{{ msg.timestamp }}</div>
                        </div>

                        <!-- 用户头像：仅在 user 消息时显示在右侧 -->
                        <div class="avatar user-style" v-if="msg.role === 'user'">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                        </div>

                    </div>
                </div>

                <!-- 底部输入交互区 -->
                <div class="chat-bottom-input">
                    <div class="shortcut-tags">
                        <span v-for="t in ['效期查询', '快递进度', '积分规则', '联系人工']" :key="t">{{ t }}</span>
                    </div>
                    <div class="input-container">
                        <textarea v-model="sentmessage" placeholder="输入您想咨询的问题..."
                            @keyup.enter.prevent="sendMsg"></textarea>
                        <div class="input-actions">
                            <div class="icon-group">😊 📎 ✂️</div>
                            <button class="submit-btn" @click="sendMsg" :disabled="!sentmessage.trim()">发送</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* 布局容器：撑满剩余视口并在中轴线对齐 */
.page-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 120px);
    /* 减去顶部导航栏高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8fa;
    overflow: hidden;
}

/* 背景 π 装饰 */
.bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .grid-pattern {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
        background-size: 30px 30px;
        opacity: 0.4;
    }

    .big-pi {
        position: absolute;
        bottom: -40px;
        right: 60px;
        font-size: 30vw;
        color: #00daa7;
        opacity: 0.04;
        font-weight: bold;
    }
}

/* 聊天窗主体 */
.chat-main-window {
    width: 1000px;
    height: 90%;
    max-height: 720px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.06);
    display: flex;
    z-index: 2;
    overflow: hidden;
}

.side-bar {
    width: 250px;
    background: #fcfdfe;
    border-right: 1px solid #f0f1f3;

    .side-title {
        padding: 22px;
        font-weight: 600;
        color: #333;
    }

    .contact-item {
        display: flex;
        align-items: center;
        padding: 16px 22px;
        gap: 14px;

        &.active {
            background: #fff;
            border-left: 4px solid #00daa7;
        }

        .pi-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e9f9f6;
            color: #00daa7;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .name {
            font-size: 14px;
            font-weight: 500;
        }

        .status {
            font-size: 12px;
            color: #00daa7;
            margin-top: 2px;
        }
    }
}

.chat-content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.chat-top-bar {
    height: 64px;
    padding: 0 25px;
    border-bottom: 1px solid #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-id {
        display: flex;
        align-items: center;
        gap: 8px;

        .dot {
            width: 8px;
            height: 8px;
            background: #00daa7;
            border-radius: 50%;
        }

        .online-text {
            font-size: 12px;
            color: #999;
        }
    }

    .top-tool {
        font-size: 13px;
        color: #666;
        cursor: pointer;
    }
}

/* 消息列表区域 */
.messages-container {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    gap: 30px;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #e2e4e7;
        border-radius: 10px;
    }

    .msg-wrapper {
        display: flex;
        gap: 15px;
        align-items: flex-start;

        /* 客服消息（左侧） */
        &.bot {
            justify-content: flex-start;

            .msg-body {
                align-items: flex-start;
            }

            .text-bubble {
                border-radius: 2px 12px 12px 12px;
            }
        }

        /* 用户消息（右侧对齐，头像在右） */
        &.user {
            justify-content: flex-end;

            /* 整体推向右边 */
            .msg-body {
                align-items: flex-end;
            }

            /* 内部文字右对齐 */
            .text-bubble {
                border-radius: 12px 2px 12px 12px;
                background: #fff;
                /* 保持你的截图风格 */
                border: 1px solid #eee;
            }

            .msg-time {
                text-align: right;
            }
        }

        .avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;

            &.bot-style {
                background: #e9f9f6;
                color: #00daa7;
                font-size: 18px;
            }

            img {
                width: 100%;
                border-radius: 50%;
            }
        }

        .msg-body {
            max-width: 70%;
            display: flex;
            flex-direction: column;
            gap: 6px;

            .text-bubble {
                padding: 12px 18px;
                background: #fff;
                font-size: 14px;
                line-height: 1.6;
                color: #444;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02);
            }

            .msg-time {
                font-size: 11px;
                color: #ccc;
            }
        }
    }
}

/* 商品卡片样式 */
.product-info-card {
    width: 380px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    gap: 18px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

    .img-box {
        width: 85px;
        height: 85px;
        background: #f9f9f9;
        border-radius: 6px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .text-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: left;

        /* 卡片内文字保持居左 */
        .p-name {
            font-size: 15px;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;
        }

        .p-price-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;

            .price {
                font-size: 18px;
                font-weight: bold;
                color: #ff5000;
            }

            .tag {
                font-size: 11px;
                color: #00daa7;
                background: #e9f9f6;
                padding: 2px 8px;
                border-radius: 4px;
            }
        }

        .order-btn {
            width: fit-content;
            background: #00daa7;
            color: #fff;
            border: none;
            padding: 6px 16px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
        }
    }
}

/* 底部区域 */
.chat-bottom-input {
    border-top: 1px solid #f0f1f3;
    padding: 15px 25px 25px;
    background: #fff;

    .shortcut-tags {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;

        span {
            font-size: 12px;
            color: #666;
            padding: 5px 14px;
            border: 1px solid #eaebed;
            border-radius: 20px;
            cursor: pointer;

            &:hover {
                border-color: #00daa7;
                color: #00daa7;
            }
        }
    }

    .input-container {
        display: flex;
        flex-direction: column;

        textarea {
            height: 90px;
            border: none;
            outline: none;
            resize: none;
            font-size: 14px;
            color: #444;
            line-height: 1.6;
        }

        .input-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon-group {
                color: #aaa;
                font-size: 18px;
                letter-spacing: 12px;
                cursor: pointer;
            }

            .submit-btn {
                background: #00daa7;
                color: #fff;
                border: none;
                padding: 8px 24px;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;

                &:disabled {
                    background: #f0f1f3;
                    color: #ccc;
                    cursor: default;
                }
            }
        }
    }
}
</style>