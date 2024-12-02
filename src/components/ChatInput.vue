<template>
    <div :class="isSearch ? 'chat-input-container-search' : 'chat-input-container'">

        <div :class="isSearch ? 'chat-input-search' : 'chat-input'">
            <div class="chat-input-text-container">
                <ChatInputIcons v-if="isUploadFile" @remove="handleRemove"  @upload="handleUpload" :isRemove="isRemove"  /> 
                <div class="chat-input-text-and-icons-container">
                    <textarea @input="setTextAreaHeight" class="chat-input-text" @keyup="debouncedHandleKeyup"
                        v-model="message" :placeholder="placeholderSign" ref="textArea"></textarea>
                    <div class="chat-input-text-icons-container">
                        <el-icon>
                            <Close @click="clearInput" />
                        </el-icon>
                        <el-icon>
                            <Upload @click="callUpload" />
                        </el-icon>
                        <el-icon>
                            <Promotion @click="sendMessage" />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import debouncer from '../utils/debounce';
import ChatInputIcons from './ChatInputIcons.vue';


export default {
    props: {
        isSearch: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        ChatInputIcons,
    },
    data() {
        return {
            message: '',
            placeholderSign: '输入消息，支持文档、图片等多模态对话',
            fileID: '',
            isRemove: false,
            isUploadFile: false,
        };
    },
    methods: {
        clearInput() {
            this.message = '';
            const textarea = this.$refs.textArea;
            textarea.style.height = 36 + "px";
        },
        handleRemove() {
            console.log('remove');
            this.$emit('remove');
        },
        callUpload() {
            this.isUploadFile = !this.isUploadFile;
        },
        handleUpload(fileID, fileUrl, isImage) {
            console.log('File ID:', fileID); // 新增：打印文件ID以进行调试
            console.log('File URL:', fileUrl); // 新增：打印文件URL以进行调试
            this.$emit('upload', fileID, fileUrl, isImage);
        },
        async sendMessage() {
            const processedValue = this.message.replace(/\s/g, '');
            if (processedValue === '') {
                this.placeholderSign = '请输入有效内容';
                this.message = '';
                return;
            }

            await this.$emit('send', this.message);
            this.message = '';
            this.placeholderSign = '输入消息，支持文档、图片等多模态对话';
            this.isRemove = !this.isRemove;
            this.$emit('remove');
            this.isUploadFile = false;
        },
        debouncedSendMessage() {
            const debounceFunc = debouncer.debounce(this.sendMessage, 500);
            debounceFunc();
        },
        debouncedHandleKeyup(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                const debounceFunc = debouncer.debounce(this.nextLine, 1000, true);
                debounceFunc();
            } else if (e.key === 'Enter') {
                this.sendMessage();  // 正常按Enter键触发发送消息逻辑
                const textarea = this.$refs.textArea;
                textarea.style.height = 36 + "px";
            }
        },
        nextLine() {
            this.message += '';
        },
        setTextAreaHeight() {
            const textarea = this.$refs.textArea;
            textarea.style.height = 50 + "px"; // 设置为初始高度
            textarea.style.height = textarea.scrollHeight + "px";
        },
    },
};
</script>


<style scoped>
.chat-input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;
    max-height: 22%;
    width: 100%;
    position: relative;
}
.chat-input-container-search {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;
    max-height: 33%;
    width: 100%;
    position: relative;
}

.chat-input {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-height: 100%;
    margin-bottom: 10px;
    width: 40%;
    margin-top: auto;
    border: 1px solid;
    border-radius: 5px;

}

.chat-input-search {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-height: 100%;
    margin-bottom: 10px;
    width: 100%;
    margin-top: auto;
    border: 1px solid;
    border-radius: 5px;

}

.chat-input-text-container {
    display: flex;
    width: 100%;
    max-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.chat-input-text {
    border: none;
    margin: 5px;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    resize: none;
    flex: 1;
    font-size: 16px;
}

.chat-input-text:focus {
    outline: none;
}

.chat-input-text-icons-container {
    margin-top: auto;
}

.chat-input-text-and-icons-container {
    display: flex;
    width: 100%;
    max-height: 100%;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

}

.el-icon {
    margin: 5px;
    cursor: pointer;
}
</style>