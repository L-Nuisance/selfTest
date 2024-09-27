<template>
  <div class="singleCourse">
    <img :src="coursePic" :alt="courseData.courseName" class="coursePic" />
    <div class="courseInfo">
      <h3 class="courseTitle">{{ courseData.courseName }}</h3>
      <p class="teacher">教师: {{ courseData.teacher }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleCourse',
  mounted() {
    // console.log(this.courseData.courseCover)
  },
  data() {
    return {
      coursePic: 'data:image/png;base64,' + this.courseData.courseCover
    }
  },
  props: {
    courseData: {
          courseId: String,
          courseCover: String,
          courseName: String,
          teacher: String
      }
  }
};
</script>

<style scoped>
  .singleCourse {
    border: 1px solid #ccc;
    border-radius: 2%;
    overflow: hidden;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 23%;
    height: 35%;
    background-color: white;
  }
  
  .coursePic {
    width: 100%;
    height: 75%;
    /* object-fit: cover; */
  }
  .courseInfo {
    height: 25%;
  }
  .courseTitle {
    margin: 0 0 0 0;
    margin-left: 3%;
    padding: 0;
    font-size: 15px;
  }
  
  .teacher {
    margin-top: 1%;
    margin-left: 2%;
    /* margin-bottom: 2%; */
    /* padding: 0 0 0 5%; */
    position: relative;
    left: 50%;
    bottom: 20%;
    font-size: 15px;
    font-style: italic;
    color: #555;
  }
</style>
