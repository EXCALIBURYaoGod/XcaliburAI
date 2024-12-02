<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="chat-sidebar">
        <el-menu active-text-color="#ffd04b" :default-active="'2-1'" :open="2" v-if="render" class="chat-menu">
          <el-menu-item index="1" @click="handleCreateConversation" :disabled="isLoading">
            <template #title>
              <el-icon>
                <Plus />
              </el-icon>
              <el-button type="text" style="font-size: 20px;" :disabled="isLoading">创建新会话</el-button>
            </template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <ChatLineSquare />
              </el-icon>
              <span style="font-size: 20px;">最近会话</span>
            </template>
            <el-menu-item v-for="(item, index) in chatWindowList.slice().reverse()" :key="item.conversation_id"
              :index="`2-${index + 1}`" @click="currentConversation = item.conversation_id" :disabled="isLoading">{{
                recentConversation(item) }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-avatar :src="aiAvatar" :size="40" />
          <el-text type="primary" :size="large">Xcalibur AI</el-text>
          <el-icon :size="30" style="margin: 0 10px 0 10px;">
            <Operation />
          </el-icon>
          <el-icon :size="30">
            <Close class="el-icon-close" @click="close" />
          </el-icon>
        </el-header>
        <el-main style="padding: 0;">
          <ChatWindow :chatWindowMessages="chatWindowMessages" :currentConversation="currentConversation"
            @updateChatMessages="updateChatMessages" @isLoading="handleIsLoading"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import aiAvatar from '@/assets/Saber.png';
import ChatWindow from '../components/ChatWindow.vue';
import { render, Text } from 'vue';
import { Conversations } from '@coze/api';
import ChatMessage from '../components/ChatMessage.vue';

export default {
  data() {
    return {
      client: this.$cozeClient,
      aiAvatar,
      chatWindowList: [],
      currentConversation: '',
      chatWindowMessages: [],
      isCreatingConversation: false,
      render: true,
      isLoading: false,
    };
  },
  components: {
    ChatWindow,
  },
  mounted() {
    this.chatWindowList = localStorage.getItem('chatWindowList') ? JSON.parse(localStorage.getItem('chatWindowList')) : [];
    // 进入该页面默认创建第一个会话
    this.handleCreateConversation();
    this.cleanUp();
  },
  watch: {
    currentConversation() {
      console.log(this.currentConversation);
      this.chatWindowMessages = this.chatWindowList.find(item => item.conversation_id === this.currentConversation)?.ChatMessages || [];
      console.log(this.chatWindowMessages);
    },
  },
  methods: {
    handleIsLoading(isLoading) {
      this.isLoading = isLoading;
    },
    shouldRerender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
    cleanUp() {
      if (!this.isCreatingConversation) {
        this.chatWindowList = this.chatWindowList.filter((item) => {
          return item.ChatMessages.length !== 0;
        });
        localStorage.setItem('chatWindowList', JSON.stringify(this.chatWindowList));
      }
    },
    recentConversation(item) {
      if (item.ChatMessages && item.ChatMessages.length > 0) {
        return item.ChatMessages[item.ChatMessages.length - 1].content;
      } else {
        return '新会话';
      }
    },
    close() {
      this.$emit('close');
    },
    async handleCreateConversation() {
      console.log('create conversation');

      let conversationId = await this.createConversation();
      this.chatWindowList.push({
        conversation_id: conversationId,
        ChatMessages: [],
      });
      this.currentConversation = conversationId;
      localStorage.setItem('chatWindowList', JSON.stringify(this.chatWindowList));
      this.isCreatingConversation = true;
      this.shouldRerender();
      this.timer = setInterval(() => {
        this.cleanUp();
      }, 60000);
    },
    async createConversation() {
      const v = await this.client.conversations.create({
        messages: [{
          role: 'user',
          content: '',
          content_type: 'text',
        }],
      });
      return v.id;
    },
    updateChatMessages(chatMessages, conversationId) {
      this.isCreatingConversation = false;
      const index = this.chatWindowList.findIndex(item => item.conversation_id === conversationId);
      if (index !== -1) {
        this.chatWindowList[index].ChatMessages = chatMessages;
        localStorage.setItem('chatWindowList', JSON.stringify(this.chatWindowList));
        console.log(this.chatWindowList);
      }
    },
  },
};
</script>

<style scoped>
.chat-sidebar {
  border-right: 1px solid #777e7c3d;
  height: 100vh;
  width: 20%;
}

.el-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #fff;
}

.el-avatar {
  margin-left: auto;
  margin-right: 5px;

}

.el-icon-close {
  margin-left: auto;
  cursor: pointer;
}

.el-text {
  margin-right: auto;
  padding: 0;
  font-size: 40px;
  color: inherit;
}

.chat-menu {
  border: none;
}

/* 这里可以添加一些针对该视图的局部样式，比如设置页面的背景色、整体的边距等 */


h1 {
  text-align: center;
  color: #333;
  height: 50px;
}
</style>
