<template>
    <WelcomeMessage class="welcome" v-if="isShowWelcome" @sendPrompt="handleSendMessage" />

    <div class="chat-window">
        <ChatInput v-if="isSearch" @send="handleSendMessage" @upload="handleFileID" @remove="handleRemove"
            :isSearch="isSearch" />
        <div :class="isSearch ? 'chat-messages-search' : 'chat-messages'" ref="chatMessagesContainer">
            <div v-for="(msg, index) in chatMessages" :key="index">
                <ChatMessage :isSearch="isSearch" :message="msg.content" :isUserMessage="msg.isUserMessage"
                    :fileUrl="msg.fileUrl || ''" :isImage="msg.isImage || false" :isLoading="msg.isLoading"
             />
            </div>
        </div>
        <ChatInput v-if="!isSearch" @send="handleSendMessage" @upload="handleFileID" @remove="handleRemove"
            :isSearch="isSearch" />
    </div>
</template>


<script>
import ChatInput from './ChatInput.vue';
import ChatMessage from './ChatMessage.vue';
import { ChatEventType } from '@coze/api';
import WelcomeMessage from './WelcomeMessage.vue';
import { tr } from 'element-plus/es/locales.mjs';



export default {
    props: {
        isSearch: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            default: 0,
        },
        chatWindowMessages: {
            type: Array,
            default: () => [],
        },
        currentConversation: {
            type: String,
            default: '1',
        },
    },
    components: {
        ChatInput,
        ChatMessage,
        WelcomeMessage,
    },
    mounted() {
        this.scrollToBottom();
    },
    data() {
        return {
            chatMessages: this.chatWindowMessages,
            conversation_id: this.currentConversation,
            isFirst: true,
            client: this.$cozeClient,
            isShowWelcome: true,
            fileID: '',
            fileUrl: '',
            isImage: false,
        };
    },
    methods: {
        handleRemove() {
            this.fileID = '';
            this.fileUrl = '';
            this.isImage = false;
        },
        handleFileID(fileID, fileUrl, isImage) {
            console.log('chatwindow fileID', fileID);
            this.fileID = fileID;
            this.fileUrl = fileUrl;
            this.isImage = isImage;
            console.log('thisfileID', this.fileID);
        },
        scrollToBottom() {
            const chatMessagesContainer = this.$refs.chatMessagesContainer;
            if (chatMessagesContainer) {
                this.$nextTick(() => {
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight - chatMessagesContainer.clientHeight;
                });
            }
        },
        handleSendMessage(message) {
            this.isShowWelcome = false;
            // 将用户发送的消息添加到聊天记录数组
            this.chatMessages.push({
                content: message,
                isUserMessage: true,
                fileUrl: this.fileUrl,
                isImage: this.isImage,
            });

            // 这里调用AI接口获取回复，假设调用一个名为getAIResponse的函数
            this.getAIResponse(message);
            this.scrollToBottom();
        },

        async getAIResponse(message) {
            this.sendMessage(message);
        },

        async sendMessage(message) {
            console.log(this.fileID);
            let additional_messages;
            if (this.fileID !== '') {
                additional_messages = [{
                    role: 'user',
                    content: JSON.stringify([
                        { type: 'file', file_id: this.fileID },
                        { type: 'text', text: message },
                    ]),
                    content_type: 'object_string',
                }];
                console.log('additional_messages', additional_messages);
            }
            else {
                additional_messages = [{
                    role: 'user',
                    content: message,
                    content_type: 'text',
                }];
            }
            this.fileID = '';
            this.fileUrl = '';
            this.isImage = false;
            const v = await this.client.chat.stream({
                bot_id: '7437388959069569039',
                user_id: '0000001',
                auto_save_history: true,
                additional_messages: additional_messages,
                conversation_id: this.isSearch ? '' : this.conversation_id,
            });

            this.chatMessages.push({ content: '', isUserMessage: false, isLoading: true });
            this.$emit('isLoading', this.chatMessages[this.chatMessages.length - 1].isLoading);
            for await (const part of v) {
                console.log(part);
                if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
    
                    this.chatMessages[this.chatMessages.length - 1].content += part.data.content.replace(/\[/, '![');
                    this.conversation_id = part.data.conversation_id;
                    this.scrollToBottom();
                }
                if (part.event === ChatEventType.CONVERSATION_CHAT_FAILED) {
                    console.error('Chat failed');
                }
                if (part.event === ChatEventType.CONVERSATION_CHAT_COMPLETED) {
                    this.chatMessages[this.chatMessages.length - 1].isLoading = false;
                    this.$emit('updateChatMessages', this.chatMessages, this.conversation_id);
                    this.$emit('isLoading', this.chatMessages[this.chatMessages.length - 1].isLoading);
                    console.log('Chat completed');
                    
                }
                if (part.event === ChatEventType.ERROR) {
                    console.error(part.error);
                }
            }

        },


    },
    ref: "chatMessagesContainer",
    watch: {
        chatWindowMessages() {
            this.chatMessages = this.chatWindowMessages;
        },
    },
};

</script>


<style scoped>
.chat-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
}

.chat-messages {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 20%;
    padding-right: 20%;
    height: 95%;
    overflow-y: auto;
}

.chat-messages-search {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    overflow-y: auto;
}


welcome-message {
    width: 70%;
}
</style>