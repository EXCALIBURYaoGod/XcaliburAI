<template>
    <div class="chat-input-icons">
        <el-upload ref="upload" v-model:file-list="fileList" class="uploadfiles" action="#" list-type="picture-card"
            :auto-upload="false" :on-change="beforeCozeUpload">
            <el-icon>
                <Plus />
            </el-icon>

            <template #file="{ file }">
                <div>
                    <template v-if="isImage(file.name)">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <el-icon><zoom-in /></el-icon>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemove(file, fileList)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </template>
                    <template v-else>
                        <img class="el-upload-list__item-thumbnail file-icon" src="../assets/文档.svg" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-delete" @click="handleRemove(file, fileList)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </template>

                </div>
            </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Delete, Download, Plus, Upload, ZoomIn } from '@element-plus/icons-vue';


export default defineComponent({
    props: {
        isRemove: {
            type: Boolean,
            default: false,
        },

    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [], // 用于存储文件列表数据，初始化为空数组
            disabled: false,
        };
    },
    watch: {
        isRemove: {
            handler(newValue) {
                console.log('isRemove', newValue);
                // 批量删除所有文件，遍历fileList进行删除操作
                this.fileList.forEach((file) => {
                    this.handleRemove(file, this.fileList);
                });
            },
            immediate: true,
        },
    },
    methods: {
        isImage(filename) {
            const imageExtensions = ['jpg', 'png', 'jpeg', 'gif'];
            const ext = filename.split('.').pop().toLowerCase();
            return imageExtensions.includes(ext);
        },
        handleRemove(uploadFile, uploadFiles) {
            console.log(uploadFile, uploadFiles);
            this.$emit('remove');
            this.fileList = uploadFiles.filter((file) => file !== uploadFile);
        },
        handlePictureCardPreview(file) {
            console.log('文件预览', file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeCozeUpload(file) {
            console.log('文件上传Coze前');
            console.log('文件上传Coze后', file);
            this.fileList.push(file);
            this.cozeUpload(file.raw);
        },
        async cozeUpload(file) {
            console.log('文件上传Coze', file);
            try {
                const res = await this.$cozeClient.files.upload({ file });
                if (res.id) {
                    console.log('上传成功:', res);
                    console.log('文件ID:', res.id);
                    // 保存文件的前端URL
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.$emit('upload', res.id, e.target.result, this.isImage(file.name));
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.error('上传失败:', error);
            }
        },
    },
});
</script>


<style scoped>
.chat-input-icons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
    padding: 10px;
    max-height: 60px;

}



:deep(.uploadfiles .el-upload--picture-card) {
    height: 60px;
    width: 60px;
    padding: 0;
    margin: 0;
}


:deep(.uploadfiles .el-upload-list--picture-card .el-upload-list__item) {
    height: 60px;
    width: 60px;
    padding: 0;
    margin: 0;
}
</style>