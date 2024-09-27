<template>
  <div class="totalarea">
    <span class="border"></span>
    <div class="coursename">
      <label class="name">请输入课程名：<span class="required">*</span></label>
      <div
        class="editable-line"
        contenteditable="true"
        ref="courseNameInput"
        @input="updateCourseName"
      ></div>
    </div>
    <div class="courseDescription">
      <label class="introduce">请输入课程简介:<span class="required">*</span></label>
      <div
        class="editable-line"
        contenteditable="true"
        ref="courseDescriptionInput"
        @input="updateCourseDescription"
      ></div>
      <div class="upload">
        <label class="cover">请上传课程封面：<span class="required">*</span></label>
        <div class="cover-container" id="image-container">
          <input
            type="file"
            id="file-input"
            style="display: none;"
            accept="image/*"
            @change="handleImageUpload"
          />
          <label for="file-input" style="cursor: pointer;">
            <img class="action" :src="imageSrc" alt="Add Image" />
          </label>
        </div>
      </div>
      <button class="nextpath" @click="handleNextStep">确定</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import store from '@/store';

export default {
  name: 'CreateCourse',
  data() {
    return {
      teacherId: store.state.user.userId,
      hasInputName: false,
      hasInputDescription: false,
      courseName: '',
      courseDescription: '',
      imageSrc: '', // 初始为空，将在 mounted 钩子中设置
    };
  },
  mounted() {
    // 设置初始的图片路径，用于点击添加的小图片
    this.imageSrc = '/addimg.png';
  },
  methods: {
    handleNextStep() {
      // 检查是否填写了必填字段
      if (!this.courseName || !this.courseDescription || (this.imageSrc === '/addimg.png')){
        // 显示弹窗提示
        alert('请填写必填信息！');
        return; // 阻止继续执行下面的代码
      }
      const base64Data = this.imageSrc.split(',')[1];

      // 构建需要传递给后端的数据对象
      const requestData = {
        teacherId: this.teacherId,
        courseName: this.courseName,
        courseDescription: this.courseDescription,
        imageSrc: base64Data,
      };

      // 发送数据到后端
      axios.post('http://43.138.136.200:8090/teacher/insertCourse', requestData)
        .then(response => {
          // 处理后端响应
          console.log('成功发送数据到后端', response.data);
          // 在这里进行路由跳转，如果需要
          // 在这里进行路由跳转，如果需要
          if (response.data.requestCode == '6_01') {
        // 课程添加成功
        alert(response.data.prompt);
        this.$router.push({
            path:'/TeacherView/TotalCourse',query:{teacherId: this.$route.query.teacherId,userId: this.$route.query.userId, nowNav: 'check-courses'}
          });
        }else {
        // 课程添加失败
        alert(response.data.prompt);
      }
         
        })
        .catch(error => {
          // 处理错误
          console.error('发送数据到后端失败', error);
        });
    },

    handleImageUpload(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // 将图片数据转换为Base64
          this.imageSrc = reader.result;
        };

        // 读取文件并触发onload事件
        reader.readAsDataURL(file);
      } else {
        // 如果用户未选择新图片，将 imageSrc 保持不变
      }
    },
    updateCourseName() {
      this.courseName = this.$refs.courseNameInput.textContent;
      this.$emit('update-course-name', this.courseName);
    },
    updateCourseDescription() {
      this.courseDescription = this.$refs.courseDescriptionInput.textContent;
      this.$emit('update-course-description', this.courseDescription);
    },
  },
};
</script>




  <style>
  .required {
    color: red;
    margin-left: 3px;
  }
  .nextpath{
      cursor: pointer;
      font-size: 15px;
      width: 30%;
      height: 50px;
      background-color: #5B86E5;
      color: white;
      position: absolute;
      bottom: 50px;
      left:30%;
      border: 0;
  }
  .returnto{
      cursor: pointer;
      border: 0;
      position: absolute;
      top:10px;
      right:20px;
      font-size: 25px;
      width: 150px;
      height: 50px;
      background-color: #5B86E5;
      color: white;
      border-radius: 20px;
  }
  .border{
      display: block;
  height: 1px; 
  
  }
  .introduce{
      margin-left: 20px;
  }
  .totalarea{
    /* top:20px;
   float:right;
      position: relative;
      box-shadow:
          5px 5px 5px rgba(0, 0, 0, 0.2),
          -5px -5px 5px rgba(0, 0, 0, 0.2);
      border-radius: 20px;
    height:600px;
    width:80%;
margin-right: 1%; */
margin-top: 1.4%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
     
  }
  .upload{
      position: relative;
  }
  .cover{
   
      margin-left: 20px;
      position: absolute;
     top:100px;
  }
  .cover-container{
      background-color: #EFEFEF;
     position: absolute;
     top:100px;
     left:20%;
      display: flex;
          justify-content: center;
          align-items: center;
     
      height:170px;
      width:170px;
     
  }
  .action{
      
      display: block;
      height:40px;
  }
  .coursename{
      margin-left: 20px;
      margin-top: 30px;
      margin-bottom: 50px;
  }
.editable-line {
    vertical-align: top;
    width: 70%;
    display: inline-block;
    padding-bottom: 5px;
    cursor: text;
    outline: none;
    border: none; /* 移除边框样式 */
    min-height: 20px; /* 设置最小高度，以确保内容可见 */
    white-space: pre-wrap; /* 处理换行 */
    border-bottom: 1px solid #000; /* 添加底边框，模拟下划线效果 */
    max-height: 100px; /* 设置您期望的最大高度 */
    overflow-y: auto; /* 当内容超过最大高度时启用垂直滚动 */
  }
  
</style>