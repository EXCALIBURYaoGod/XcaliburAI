<template>
    <div class="message-container"
        :class="{ 'user-message': isUserMessage, 'ai-message': !isUserMessage, 'isSearch': isSearch }">
        <div class="message-content">
            <el-icon v-if="isLoading && isNew" class="is-loading">
                <Loading />
            </el-icon>
            <div v-highlight>
                <div v-html="htmlContent"></div>
            </div>
            <img v-if="isImage" :src="fileUrl" style="width: 100%;" />
        </div>
    </div>
</template>

<script>
import { tr } from 'element-plus/es/locales.mjs';
import MarkdownIt from 'markdown-it';

export default {
    props: {
        message: String,
        isUserMessage: Boolean,
        isSearch: {
            type: Boolean,
            default: false,
        },
        isImage: {
            type: Boolean,
            default: false,
        },
        fileUrl: {
            type: String,
            default: '',
        },
        isLoading: {
            type: Boolean,
            default: true,
        },
        isNew: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            md: new MarkdownIt(),
            codePart: '',
            remainingMessage: '', // 新增用于存储剪除代码块后的剩余消息
            htmlContent: '',
        };
    },
    mounted() {
        this.markdownRender();

    },
    watch: {
        message() {
            this.markdownRender();
        },
        htmlContent() {
            this.$nextTick(() => {
                const imgElements = this.$el.querySelectorAll('img');
                imgElements.forEach(img => {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.border = '1px solid #ccc';
                });
            });
        },
    },
    methods: {
        markdownRender() {
            const md = new MarkdownIt();
            this.htmlContent = md.render(this.message);
        },
    },
};
</script>

<style scoped>
.hljs {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
}

.message-container {
    display: flex;
    overflow-y: auto;
    margin-bottom: 10px;
}

.user-message {
    justify-content: flex-end;
}

.ai-message {
    justify-content: flex-start;
}

.user-message.isSearch {
    justify-content: flex-start;
}


.message-content {
    max-width: 68%;
    width: auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #e0e0e0;
    text-align: left;
}


.user-message .message-content {
    background-color: #0084ff;
    color: white;
}

span {
    display: flex;
    flex-direction: column;
}
</style>