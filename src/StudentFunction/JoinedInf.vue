<template>
    <div class="joinedInf">
        <h2>课程信息</h2>
        <hr>
        <img :src="this.coursePic">
        <h3>{{ this.courseName }}</h3>
        <span>教师：{{ teacher }}</span>
        <button type="button" class="button" id="quit" @click="quitCourse()">退出课程</button>
        <button type="button" class="button" id="back" @click="goBack()">返回</button>
        <hr id="line">
        <p>{{ this.courseDescription }}</p>
    </div>
</template>

<script>
import store from '@/store';
import axios from 'axios';

export default {
    name: 'JoinedInf',
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
        quitCourse() {
            var quitData = {
                studentId: this.studentId,
                courseId: this.courseId
            }
            axios.defaults.headers.post["Content-Type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/student/quitCourse', JSON.stringify(quitData))
                .then (
                    (res) => {
                        if(res.data.requestCode == '29_01') {
                            alert('退出成功')
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
                        }else if(res.data.requestCode == '29_00') {
                            alert('课程加载失败')
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
    .joinedInf {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .joinedInf hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .joinedInf img {
        width: 15%;
        height: 20%;
        margin-left: 10px;
        border-radius: 5px;
        position: relative;
        top: 2%;
        left: 1%;
    }
    .joinedInf h2 {
        margin: 5px;
        font-weight: 200;
    }
    .joinedInf h3 {
        position: relative;
        left: 20%;
        bottom: 25%;
        font-size: 30px;
    }
    .joinedInf span {
        height: auto;
        width: auto;
        position: relative;
        left: 20%;
        bottom: 25%;
    }
    .joinedInf #line {
        position: relative;
        bottom: 10%;
    }
    .joinedInf p {
        position: relative;
        bottom: 10%;
        margin: 10px;
        overflow-x: auto;
    }
    .joinedInf button {
        margin: 0.2%;
        height: 7%;
        width: 10%;
        border: 0;
        border-radius: 5px;
        background-color: #7b9ce3;
        color: white;
    }
    .joinedInf button:hover {
        background-color: #5B86E5;
        cursor: pointer;
    }
    .joinedInf #quit {
        position: relative;
        left: 75%;
        bottom: 25%;
    }
    .joinedInf #back {
        position: relative;
        left: 64.5%;
        bottom: 15%;
    }
</style>