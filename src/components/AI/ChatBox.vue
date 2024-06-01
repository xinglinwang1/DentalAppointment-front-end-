<template>
    <div class="chat-container">
        <div class="chat-content">
            <div class="chat-header">{{ chatObjectName }}</div>
            <div class="chat-messages" ref="chatMessages">
                <div v-for="(message, index) in messages" :key="index" class="chat-message">
                    <div class="message"
                        :class="{ 'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot' }">
                        {{ message.text }}
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
import axios from 'axios';

export default {
    name: "ChatMechine",
    // props: {
    //     chatObjectName: {
    //         type: String,
    //         required: true
    //     }
    // },
    data() {
        return {
            messages: [
                { sender: 'bot', text: '你好！我是AI小济，有什么能帮上你的？' }
            ],
            index: 1,
            newMessage: '',
            chatObjectName: '',
            sessionId: '',
            accessToken: '',
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({ sender: 'user', text: this.newMessage });
                this.sendChatRequest();
                this.newMessage = '';
                this.scrollToBottom();
            }
        },
        scrollToBottom() {
            this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        },

        // 获取accessToken
        async fetchAccessToken() {
          const apiUrl = '/116.30.22.114/oauth/2.0/token';
          const params = {
            grant_type: 'client_credentials',
            client_id: 'MmQNSFwQC3wcYie9TecDFckD',
            client_secret: '1YJDlAvsduEeICSjg410ti98Ga5zkF7I'
          };
    
          try {
            const response = await axios.post(apiUrl, null, { params });
            const data = response.data;
    
            if (data.access_token) {
              this.accessToken = data.access_token;
              console.log('Access Token:', this.accessToken);
            } else {
              console.error('Error: Access token not found in the response.');
            }
          } catch (error) {
            console.error('Request Error:', error);
          }
        },

        // 获取回答
        async sendChatRequest() {
            const apiUrl = '/116.30.22.114/rpc/2.0/unit/service/chat';
      
            const requestBody = {
                log_id: "1234567890",
                version: '2.0',
                service_id: 'S107999',
                session_id: this.sessionId,
                request: {
                  query: this.newMessage,
                  user_id: '1234567890'
                },
                dialog_state: {
                  contexts: {
                    SYS_REMEMBERED_SKILLS: [
                      '1510572'
                    ]
                  }
                }
            };
      
            try {
                const response = await axios.post(`${apiUrl}?access_token=${this.accessToken}`, requestBody);
                const responseData = response.data;
        
                // 检查响应是否成功
                if (responseData.error_code === 0) {
                    // 存储 session_id
                    this.sessionId = responseData.result.session_id;
          
                    // 提取字段 say
                    const sayText = responseData.result.response_list[0].action_list[0].say;
          
                    // 创建返回的消息对象
                    this.messages.push({
                      sender: 'bot',
                      text: sayText,
                    });
                    this.scrollToBottom();
      
          
                    console.log('Session ID:', this.sessionId);
                    console.log('Message:', this.message);
                } else {
                    console.error('API Error:', responseData.error_msg);
                }
            } catch (error) {
                console.error('Request Error:', error);
            }
        }  
    },
    mounted() {
        this.scrollToBottom();
        this.fetchAccessToken();
    }
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