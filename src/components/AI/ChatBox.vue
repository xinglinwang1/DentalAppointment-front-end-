<template>
    <div class="chat-container" ref="chatMessages">
        <div class="chat-content">
            <div class="chat-header">{{ chatObjectName }}</div>
            <div class="chat-messages">
                <div v-for="(message, index) in messages" :key="index" class="chat-message">
                    <div class="message"
                        :class="{ 'user-message': message.role === 'user', 'bot-message': message.role === 'assistant' }">
                        {{ message.content }}
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-input-container">
            <el-input placeholder="输入病情描述..." v-model="newMessage" @keyup.enter="sendMessage" clearable
                class="chat-input">
                <el-button icon="el-icon-send" @click="sendMessage"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';
import OpenAI from 'openai';

export default {
    name: "ChatMechine",
    data() {
        return {
            messages: [
                { role: 'assistant', content: '你好！我是AI小济，有什么能帮上你的？' }
            ],
            index: 1,
            newMessage: '',
            chatObjectName: '',
            client: new OpenAI({
              apiKey: 'sk-RpoWv4O9F9d9Kutc5Oarp7PP47PUjetPrVMiTQXIBilZWaWv', // 确保在.env文件中设置了这个环境变量
              baseURL: 'https://api.moonshot.cn/v1',
              dangerouslyAllowBrowser: true
            })
        };
    },
    methods: {
        
        async sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({ role: 'user', content: this.newMessage });
                await this.chat();
                this.newMessage = '';
                this.scrollToBottom();
                //console.log("message:", this.messages)
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
            })
        },


        async chat() {
          const completion = await this.client.chat.completions.create({
            model: 'moonshot-v1-8k',
            messages: this.messages
          });
          this.messages.push(completion.choices[0].message);
          return completion.choices[0].message.content;
        },
    },
    mounted() {
        this.scrollToBottom();
    },
};
</script>

<style>
.chat-container {
    height: 400px;
    border: 1px solid #ccc;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    /* 使用Flex布局 */
    flex-direction: column;
    /* 垂直布局 */
}

.chat-content {
    flex-grow: 1;
    /* 允许聊天内容区域填充剩余空间 */
}

.chat-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    /* 文字居中对齐 */
}

.chat-messages {
    margin-bottom: 10px;
}

.message {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    display: inline-block;
    max-width: 70%;
}

.user-message {
    background-color: #3498db;
    color: #fff;
    float: right;
    /* 对齐到右侧 */
    clear: both;
    /* 清除浮动 */
}

.bot-message {
    background-color: #e1e1e1;
    color: #000;
    float: left;
    /* 对齐到左侧 */
    clear: both;
    /* 清除浮动 */
}

.chat-input-container {
    margin-top: auto;
    /* 输入框容器位于底部 */
}

.chat-input {
    width: 100%;
}
</style>