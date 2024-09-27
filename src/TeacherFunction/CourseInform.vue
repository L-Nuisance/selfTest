<template>
  <div class="total">
    <div>
      <div></div>
     <span class="cn" v-if="!isEditing">课程名: {{ courseName }}</span>
      
      <div v-if="isEditing" id="courseName">
        <span class="cn">课程名: {{ courseName }}</span>
        <span class="modify-button" @click="modify('courseName')">
          <img src="./edit.png" alt="">
        </span>
      </div>
    </div>
    <div class="gender">
      <span v-if="isEditing">课程状态:</span>
      <span v-if="isEditing">
        <label>
          <input type="radio" v-model="courseStatus" value="1"> 上架
        </label>
        <label>
          <input type="radio" v-model="courseStatus" value="0"> 下架
        </label>
      </span>
      <span v-if="!isEditing">{{ courseStatus == 1 ? '课程状态：上架' : '课程状态：下架' }}</span>
      
    </div>
    <div>
      <span class="cd" v-if="!isEditing" > 课程简介:{{ courseDescription }}</span>
      <div v-if="isEditing" id="courseDescription">
        <span class="cd"> 课程简介:{{ courseDescription }}</span>
        <span class="modify-button" @click="modify('courseDescription')">
          <img src="./edit.png" alt="">
        </span>
      </div>
    </div>
    <div class="fengmian">
      <span class="fm">课程封面:<img  :src="courseImage" alt=""> </span>
      <span class="modify-button" v-if="isEditing" @click="openFileInput">
        <img src="./edit.png" alt="">
      </span>
      <input v-if="isEditing" type="file" ref="fileInput" id="fileInput" @change="displayImage">
    </div>
    <button class="return" @click="toggleEditing">{{ isEditing ? '取消修改' : '修改' }}</button>
    <button v-if="isEditing" class="return" @click="saveChanges">保存更改</button>
    <div v-if="!isEditing"> <router-link :to="{path:'/TeacherView/TotalCourse',query:{userId: this.teacherId, nowNav: 'check-courses'}}">
       <span  class="back">返回</span></router-link></div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  name: 'CourseInform',
  data() {
    return {
      teacherId: store.state.user.userId,
      isEditing: false,
      courseId: store.state.course.courseId,
      courseName: '',
      courseDescription: '',
      courseImage: '',
      courseStatus: '',
    };
  },
  created() {
    this.fetchCourseDetails();
  },
  methods: {
    fetchCourseDetails() {
      axios.get(`http://43.138.136.200:8090/teacher/selectCourseInformation?courseId=` + this.courseId)
        .then(response => {
          const data = response.data;
          this.courseName = data.courseName;
          this.courseDescription = data.courseDescription;
          this.courseImage = `data:image/png;base64,${data.courseImage}`;
          this.courseStatus = data.courseStatus;
        })
        .catch(error => console.error('Error fetching course details:', error));
    },
    modify(elementId) {
      if (elementId === 'courseStatus') {
        this.isEditing = true;
      } else {
        let maxLength = 20; // 设置最大长度
        let promptMessage = `请输入新的${elementId === 'courseName' ? '课程名' : '课程简介'}（最大长度为${maxLength}个字符）`;

        let newValue = prompt(promptMessage, this[elementId]);

        // 检查课程名称长度
        if (elementId === 'courseName' && newValue && newValue.length > maxLength) {
          alert('输入的最大长度为20个字符！');
          return; // 不更新值
        }

        if (newValue !== null && newValue !== "") {
          this[elementId] = newValue;
        }
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    displayImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.courseImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    saveChanges() {
      const base64Data = this.courseImage.split(',')[1];

      const requestData = {
       teacherId: this.teacherId,
        courseId: this.courseId,
        courseName: this.courseName,
        courseDescription: this.courseDescription,
        courseStatus: this.courseStatus,
        courseImage: base64Data,
      };
      axios.post('http://43.138.136.200:8090/teacher/updateCourse', requestData)
        .then(response => {
          alert(response.data.prompt);
          if(response.data.requestCode == '11_01') {
            this.$store.commit('course/setCourseName', this.courseName)
            this.$store.commit('course/setCoursePic', 'data:image/png;base64,' + base64Data)
            this.isEditing = false;
          }
          console.log('成功发送数据到后端', response.data);
        })
        .catch(error => {
          alert('更新课程信息时出现错误，请稍后再试。');
          console.error('发送数据到后端失败', error);
        });
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

      <style scoped>
      .return {
        cursor: pointer;
      }
      .back{
        border-radius: 10px;
        margin-bottom: 20px;
        margin-left: 40%;
        line-height:50px;
        background-color: #5B86E5;
        display: inline-block;
        height: 50px;
        width:200px;
        color:white;
        font-size: 20px;
        text-align: center;
      }
      .back:hover {
        background-color: #4C6EB8;
      }
      .return{
        border:none;
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 20px;
          width: 100px;
          background-color: #5B86E5;
          color: white;
          border-radius: 20px;
      }
      .return:hover {
        background-color: #4C6EB8;
      }
      #courseDescription{
          margin-left: 15px;
  margin-bottom: 50px;
  display: inline-block;
  word-wrap: break-word; 
  max-width: 70%;
  vertical-align: top; /* 垂直对齐 */
  margin-top: 20px;
  max-height: 100px; /* 设置您期望的最大高度 */
    overflow-y: auto; /* 当内容超过最大高度时启用垂直滚动 */
      }

      .gender{
          margin-left: 15px;
          margin-bottom: 20px;
      }
      .cd{
        max-height: 100px; /* 设置您期望的最大高度 */
    overflow-y: auto;
          margin-left: 15px;
  display: inline-block;
  margin-bottom: 20px;
  margin-top: 20px;
  word-wrap: break-word; /* 自动换行 */
  max-width: 70%;  
  vertical-align: top; /* 垂直对齐 */
      }
      .fm{
          margin-left: 15px;
      display: inline-block;  
     margin-bottom: 20px;
     margin-top: 20px;
      }
     .cn{
          margin-left: 15px;
      display: inline-block;
     margin-bottom: 20px;
     margin-top: 20px;

      }
      #courseName{
          margin-left: 15px;
      display: inline-block;
     margin-bottom: 20px;
     margin-top: 20px;
  }
  .total{
    /* display: inline-block;
      margin-right: 20px;
      box-shadow:
          5px 5px 5px rgba(0, 0, 0, 0.2),
          -5px -5px 5px rgba(0, 0, 0, 0.2);
      
      position: relative;
     border-radius: 20px;
     height: 600px;
     width:1150px; */
     margin-top: 1.4%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
  }
      .fm>img {
          margin-left: 15px;
          vertical-align: top;
          height: 150px;
          margin-bottom: 100px;
          border: 1px solid black;
          width: 150px;
          border-radius: 20px;
      }
      .modify-button>img{
          height: 20px;
      }
      .modify-button {
         
          display: inline-block;
      margin-top: 10px;
          cursor: pointer;
          margin-left: 20px;
      }

      #fileInput {
          display: none;
      }
  </style>