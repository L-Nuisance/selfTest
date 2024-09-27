<!-- ExampleComponent.vue -->
<template>
  <div class="course" @click="toTheCourse">
        <img :src="courseCover" alt="" class="cover">
      <!-- <div
       class="title">{{ courseId }}</div> -->
      <div class="title">{{ courseTitle }}</div>
      <div class="name">{{ teacherName }}</div>
    </div>
  <!-- <router-link :to="{ name: 'CourseInform', params: { courseId: this.courseId } }"> </router-link> -->
  </template>
  
  <script>
  import store from '@/store';
 
  export default {
    name:'SeparateCourse',
    props: ['courseCover', 'courseTitle', 'teacherName','courseId'],
    methods: {
      toTheCourse() {
        this.$store.commit('course/setCourseId', this.courseId)
        this.$store.commit('course/setCourseName', this.courseTitle)
        this.$store.commit('course/setCoursePic', this.courseCover)
        this.$router.push({name: 'courseInformation', query: {userId: store.state.user.userId, courseId: this.courseId, nowNav: 'course-page'}})
        // window.location.replace('http://localhost:8080/' + '/TeacherCourse?teacherId=' + teacherId + '&userId=' + teacherId + '&courseId=' + this.courseId);
      }
    }
  }; 
  </script>
<style scoped>
.course {
  margin-top: 20px;
  box-shadow:
    5px 5px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  height: 200px;
  width: 18%;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 5%;
  cursor: pointer;
}

.cover {
  position: absolute;
  top: 0;

  margin: 0;
  padding: 0;
  height: 150px;
  width: 100%;
  border-radius: 20px;

}

.title {
  font-size: 18px;
  color:black;
  position: absolute;
  top: 160px;
}

.name {
  position: absolute;
  top: 180px;
}
</style>


  