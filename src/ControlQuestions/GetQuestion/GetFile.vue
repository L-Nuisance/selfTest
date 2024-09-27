<template>
  <div class="getFile">
    <span class="ps">Ps:</span>
    <br>
    <span class="ps">文件中每个题目为单行且单个题目格式为：章节;知识点;题目(包含选项);答案;题目类型;难度系数</span>
    <br>
    <span class="ps">说明：章节与知识点应为已创建的章节与知识点；选项与选项内容之间请用‘.’隔开;题目类型仅限选择题和填空题；难度系数设置请在0~1之间</span>
    <el-form>
      <el-form-item>
        <!-- 添加一个遮罩层 -->
        <div v-if="uploading" class="upload-mask"></div>
        <el-upload
          v-model="fileList"
          class="upload-demo"
          action=""
          auto-upload="false"
          :http-request="uploadFile"
          :before-upload="beforeUpload"
          @change="handleFileChange"
        >
          <el-button type="primary" :loading="uploading" :disabled="uploading || isUploading">
            点击上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip">仅支持 .doc 与 .docx 文件</div>
          </template>
        </el-upload>
        <el-dialog v-if="uploading" title="上传中..." :visible="uploading" center>
          <span>文件正在上传，请稍候...</span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  name: 'GetFile',
  data() {
    return {
      fileList: [],
      teacherId: store.state.user.userId,
      courseId: store.state.course.courseId,
      uploading: false, // 标志文件上传状态
      isUploading: false // 追踪文件上传状态
    };
  },
  methods: {
    beforeUpload(file) {
      if (this.uploading || this.isUploading) {
        // 如果正在上传或文件上传中，阻止选择新文件
        return false;
      } else {
        return true;
      }
    },
    uploadFile() {
      this.uploading = true; // 设置标志以指示文件上传已开始
      this.isUploading = true; // 设置文件上传状态为 true

      if (this.fileList.length > 0) {
        const formData = new FormData();
        formData.append('file', this.fileList[0].raw);

        const jsonData = {
          teacherId: this.teacherId,
          courseId: this.courseId
        };

        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        formData.append('json', jsonBlob);

        axios.post('http://43.138.136.200:8090/teacher/insertQuestionByWord', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('文件上传成功:', response.data);

          // 模拟alert（setTimeout仅作为示例，实际应用中可能需要使用合适的提示方式）
          setTimeout(() => {
            alert(response.data.prompt);
            this.$parent.close(true);
            // 处理上传成功的逻辑
          }, 1000);
        })
        .catch(error => {
          console.error('上传文件时出错:', error);
          // 处理上传失败的逻辑
        })
        .finally(() => {
          this.uploading = false; // 在完成后重置上传状态为 false
          this.isUploading = false; // 上传完成后恢复按钮点击
        });
      } else {
        console.error('未选择要上传的文件。');
        // 处理没有选择文件的逻辑
      }
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
    }
  }
};
</script>

<style scoped>
.getFile {
  position: relative;
  left: 5%;
  top: 20%;
}

.upload-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); /* 半透明白色 */
  z-index: 999; /* 放在最上层 */
}
.ps {
  color: #8b868694;
  font-size: 15px;
}
</style>
