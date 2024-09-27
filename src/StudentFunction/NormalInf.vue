<template>
    <div class="normalInf">
        <h2>课程信息</h2>
        <hr>
        <img :src="coursePic">
        <h3>{{ courseName }}</h3>
        <span>教师：{{ teacher }}</span>
        <button type="button" class="button" id="join" @click="joinCourse()">加入课程</button>
        <button type="button" class="button" id="back" @click="goBack()">返回</button>
        <hr id="line">
        <p>{{ courseDescription }}</p>
    </div>
</template>

<script>
import store from '@/store';
import axios from 'axios';

export default {
    name: 'NormalInf',
    computed: {
        studentId() {
            return store.state.user.userId
        },
        courseId() {
            return store.state.course.courseId
        },
        courseName() {
            return store.state.course.courseName;
        },
        teacher() {
            return store.state.course.teacher;
        },
        courseDescription() {
            return store.state.course.description;
        },
        coursePic() {
            return store.state.course.coursePic;
        },
    },
    methods: {
        joinCourse() {
            var quitData = {
                studentId: this.studentId,
                courseId: this.courseId
            }
            axios.defaults.headers.post["Content-Type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/student/joinCourse', JSON.stringify(quitData))
                .then (
                    (res) => {
                        if(res.data.requestCode == '26_01') {
                            alert('加入成功')
                            //路由跳转
                            this.$router.push(
                                {
                                    name: 'myCourses',
                                    query: {
                                        userId: this.studentId,
                                        nowNav: 'my-courses'
                                    }
                                }
                            )
                        }else if(res.data.requestCode == '26_00') {
                            alert('课程加入失败')
                        }
                    }
                )
        },
        goBack() {
            this.$store.commit('course/setCourseId', '');
            this.$store.commit('course/setCourseName', '');
            this.$store.commit('course/setCoursePic', '');
            this.$store.commit('course/setTeacher', '');
            this.$store.commit('course/setKnoData', []);
            this.$store.commit('course/setDescription', '');
            this.$router.push(
                {
                    name: 'myCourses',
                    query: {
                        userId: this.studentId,
                        nowNav: 'my-courses'
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
    .normalInf {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .normalInf hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .normalInf img {
        width: 15%;
        height: 20%;
        margin-left: 10px;
        border-radius: 5px;
        position: relative;
        top: 2%;
        left: 1%;
    }
    .normalInf h2 {
        margin: 5px;
        font-weight: 200;
    }
    .normalInf h3 {
        position: relative;
        left: 20%;
        bottom: 25%;
        font-size: 30px;
    }
    .normalInf span {
        height: auto;
        width: auto;
        position: relative;
        left: 20%;
        bottom: 25%;
    }
    .normalInf #line {
        position: relative;
        bottom: 10%;
    }
    .normalInf p {
        position: relative;
        bottom: 10%;
        margin: 10px;
        overflow-x: auto;
    }
    .normalInf button {
        margin: 0.2%;
        height: 7%;
        width: 10%;
        border: 0;
        border-radius: 5px;
        background-color: #7b9ce3;
        color: white;
    }
    .normalInf button:hover {
        background-color: #5B86E5;
        cursor: pointer;
    }
    .normalInf #join {
        position: relative;
        left: 75%;
        bottom: 25%;
    }
    .normalInf #back {
        position: relative;
        left: 64.5%;
        bottom: 15%;
    }
</style>