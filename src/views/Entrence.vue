<template>
    <div class="entrence">
        <el-container>
            <el-header>
                <h1>Welcome to Xcalibur</h1>
                <el-input @input="toggleOverflowVisible" @click="toggleOverflowVisible" placeholder="Anything to ask...">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </el-header>
            <el-main style="display:flex; flex-direction: column; align-items: center; justify-content: center;">
                <img src="@/assets/Saber.png" alt="logo">
                <el-button type="primary" @click="handleClick" style="margin-top: 20px;">开始聊天</el-button>
            </el-main>
            <el-dialog v-model="dialogOverflowVisible" title="Ask me anything" width="800" 
            destroy-on-close draggable
            >
                <ChatWindow :isSearch="isSearch"/>
            </el-dialog>
        </el-container>
    </div>

</template>

<script>
import ChatWindow from '../components/ChatWindow.vue';


export default {
    name: 'Entrence',
    components: {
        ChatWindow,
    },
    data() {
        return {
            dialogOverflowVisible: false,
            isSearch: false,
        }
    },
    methods: {
        handleClick() {
            this.$emit('isSingle', true);
            this.isSearch = false;
        },
        toggleOverflowVisible() {
            this.dialogOverflowVisible = true;
            this.isSearch = true;
        },
    },
}


</script>

<style lang="scss" scoped>
.entrence {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;


    img {
        width: 50vh;
        height: 50vh;
    }

    h1 {
        flex: 1;
        font-size: 24px;
        margin-left: 10px;
        margin-right: auto;
    }

}

.el-container {
    width: 100%;
}

.el-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.el-input {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
}


:deep(.el-dialog__body){
    height: 400px;
}
</style>