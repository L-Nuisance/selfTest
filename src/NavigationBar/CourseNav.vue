<template>
    <div class="courseNav">
        <div class="course-message">
            <img :src="coursePic" class="course-img">
            <p class="course-name" v-text="user_name"></p>
        </div>
        <div class="function-router-link">
            <button class="router-link" id="course-page" 
                    @click="toCoursePage()"
                    @mouseenter="inEvent('course-page')"
                    @mouseout="outEvent('course-page')">课程页面</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="manage-questions" 
                    @click="toManageQuestion()"
                    @mouseenter="inEvent('manage-questions')"
                    @mouseout="outEvent('manage-questions')">题目管理</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="all-students"
                    @click="toAllStudent()"
                    @mouseenter="inEvent('all-students')"
                    @mouseout="outEvent('all-students')">所有学生</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="manage-kno"
                    @click="toManageKno()"
                    @mouseenter="inEvent('manage-kno')"
                    @mouseout="outEvent('manage-kno')">知识点管理</button>
        </div>
    </div>
</template>

<script>
import store from '@/store';
export default {
    name:'CourseNav',
    data() {
        return {
            teacherId: store.state.user.userId,
            courseId: store.state.course.courseId,
            nowNav: this.$route.query.nowNav
        }
    },
    computed: {
        user_name() {
            return store.state.course.courseName
        },
        coursePic() {
            return store.state.course.coursePic
        }
    },
    mounted() {
        let thisEleID = document.getElementById(this.$route.query.nowNav);
        if(thisEleID != null) {
              thisEleID.style.backgroundColor = '#4C6EB8';
            }
    },
    watch: {
        '$route.query.nowNav'(newNav) {
            if(newNav == 'course-page' || newNav == 'manage-questions' || newNav == 'all-students' || newNav == 'manage-kno') {
                let oldEleID = document.getElementById(this.nowNav)
                oldEleID.style.backgroundColor = '#5B86E5'
                let thisEleID = document.getElementById(newNav);
                // this.changNav(newNav)
                thisEleID.style.backgroundColor = '#4C6EB8';
                this.nowNav = newNav
            }
        }
    },
    methods: {
        toCoursePage() {
            this.$router.push(
                {name:'courseInformation',query:{teacherId: this.teacherId,courseId: this.courseId, userId: this.$route.query.userId, nowNav: 'course-page'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let coursePageID = document.getElementById('course-page');
            nowID.style.backgroundColor = '#5B86E5';
            coursePageID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'course-page'
        },
        toManageQuestion() {
            this.$router.push(
                {name:'showQuestions',query:{teacherId: this.teacherId,courseId: this.courseId,userId: this.$route.query.userId, nowNav: 'manage-questions'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let manageQuestionID = document.getElementById('manage-questions');
            nowID.style.backgroundColor = '#5B86E5';
            manageQuestionID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'manage-questions';
        },
        toAllStudent() {
            this.$router.push(
                {name:'allStudents',query:{teacherId: this.teacherId,courseId: this.courseId,userId: this.$route.query.userId, nowNav: 'all-students'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let allStudentID = document.getElementById('all-students');
            nowID.style.backgroundColor = '#5B86E5';
            allStudentID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'all-students';
        },
        toManageKno() {
            this.$router.push(
                {name:'manageKnowledge',query:{teacherId: this.teacherId,courseId: this.courseId,userId: this.$route.query.userId, nowNav: 'manage-kno'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let manageKnoID = document.getElementById('manage-kno');
            nowID.style.backgroundColor = '#5B86E5';
            manageKnoID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'manage-kno'
        },
        inEvent(thisEle) {
            if(thisEle != this.nowNav) {
                let thisEleID = document.getElementById(thisEle);
                thisEleID.style.backgroundColor = '#4C6EB8';
            }
        },
        outEvent(thisEle) {
            if(thisEle != this.nowNav) {
                let thisEleID = document.getElementById(thisEle);
                thisEleID.style.backgroundColor = '#5B86E5';
            }
        }
    }
}
</script>

<style scoped>
    .courseNav {
        margin: 0;
        padding: 0;
        /* background-color: rebeccapurple; */
        background-color: #5B86E5;
        /* height: 90%;
        width: 15%; */
        height: 600px;
        width: 15%;
        border-radius: 15px;
        /* position: relative;
        left: 200px; */
    }
    .courseNav .course-message {
        margin: 0;
        padding: 0;
        height: 120px;
        width:100%;
        position: relative;
        left: 50%;
        top: 0%;
        transform: translate(-50%,15%);
        /* background-color: red; */
    }
    .courseNav .course-message .course-img {
        margin: 0;
        padding: 0;
        height: 80px;
        width: 80px;
        border-radius: 25px;
        cursor: pointer;
        position: relative;
        left: 50%;
        transform: translate(-50%,0%);
    }
    .courseNav .course-message .course-name {
        margin: 0;
        padding: 15px;
        cursor: pointer;
        color: white;
        text-align:center;
        font-size: 15px;
    }
    .courseNav .function-router-link {
        margin: 0;
        padding: 0;
        height: 200px;
        width: 100%;
        position: relative;
        top: 25px;
        /* background-color: red; */
    }
    .courseNav .function-router-link .router-link {
        height: 90px;
        width: 100%;
        text-decoration: none;
        margin: 0;
        margin-top: -8%;
        margin-bottom: -8%;
        border: none;
        border-radius: 10px;
        font-size: 25px;
        cursor: pointer;
        background-color: #5B86E5;
        color: white;
        position: relative;
        left: 0%;
        top: 25%;
    }
    .courseNav .function-router-link .router-link:hover {
        background-color: #4C6EB8;
    }
</style>