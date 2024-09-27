<!-- TotalCourse.vue -->
<template>
  <div class="totalcourse">
     <div class="research">
    <span class="top">我的课程</span>
    <!-- 搜索输入字段 -->
    <input v-model="searchQuery" placeholder="按课程名称搜索" @input="handleSearch"  class="inputtxt"/>
    <div class="hrline"></div>
  </div>
  <div class="course-container">
    
    <!-- 显示过滤后的课程 -->
    <SeparateCourse
      v-for="(data, index) in filteredDataList"
      :key="index"
      :courseId="data.ID"
      :courseTitle="data.courseName"
      :teacherName="data.teacherId"
      :courseCover="data.courseCover"
      ref="course"
      @click="xx()"
    />
  </div>
</div>
 
</template>

<script>
import SeparateCourse from './SeparateCourse.vue'; // 替换为你的实际路径
import axios from 'axios';
import store from '@/store';

export default {
  components: {
    SeparateCourse,
  },
  data() {
    return {
      teacherId: store.state.user.userId,
      dataList: [], // 存储从后端获取的数据
      searchQuery: '', // 存储搜索查询
      filteredDataList: [], // 存储过滤后的数据
    };
  },
  mounted() {
    // 在组件挂载后发起异步请求，获取多组数据
    this.fetchData();
  },
  methods: {
    xx() {
      // 处理点击逻辑
    },
    fetchData() {
      // 使用 Axios 获取多组数据
      axios.get("http://43.138.136.200:8090/teacher/selectCourse?teacherId=" + this.teacherId)
        .then(response => {
          console.log(response.data)
          if (response.data.requestCode == '18_01') {
            this.dataList = response.data.list;
          
            // 处理课程封面的 Base64 编码
            this.dataList.forEach(courseData => {
              courseData.courseCover = `data:image/png;base64,${courseData.courseCover}`;
            });

            // 初始状态下显示所有课程
            this.filteredDataList = this.dataList;
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    handleSearch() {
      // 输入变化时触发，更新过滤后的列表
      this.filteredDataList = this.dataList.filter(course => {
        return course.courseName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.hrline{
  
  width:100%;
  height:0.1px;
  border:1px solid black;
}
.inputtxt{
  display:inline-block;
  height: 30px;
  width: 250px;
  border-radius: 10px;
  margin-top: 1px;
  margin-left: 60%;
}
.top{
  margin-left: 10px;
  margin-top: 10px;
  display: inline-block;
  font-size: 30px;
}
.totalcourse{
  /* height: 600px;
  width: 80%;
  float: right;
  box-shadow:
    5px 5px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-right: 1%; */
  margin-top: 1.4%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
}
.course-container {
 display:flex;
  height: 490px;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
  position: relative;

  border-radius: 20px;
  margin-right: 1%;
}

.course-container > SeparateCourse {
  margin-right: 20px;
  margin-bottom: 20px; /* 设置行间距 */
}
</style>
