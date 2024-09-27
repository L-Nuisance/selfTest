<template>
    <div class="joinedNav">
        <div class="user-message">
            <img :src="coursePic" class="nav-head-portrait">
            <p class="courseName" v-text="courseName"></p>
        </div>
        <div class="function-router-link">
            <button class="router-link" id="course-message"
                    @click="toCourseMessage()"
                    @mouseenter="inEvent('course-message')"
                    @mouseout="outEvent('course-message')">课程简介</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="course-knowledge"
                    @click="toCourseKnowledge()"
                    @mouseenter="inEvent('course-knowledge')"
                    @mouseout="outEvent('course-knowledge')">课程知识点</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="my-evaluation"
                    @click="toMyEvaluation()"
                    @mouseenter="inEvent('my-evaluation')"
                    @mouseout="outEvent('my-evaluation')">我的测评</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="start-test"
                    @click="toStartTest()"
                    @mouseenter="inEvent('start-test')"
                    @mouseout="outEvent('start-test')">开始测评</button>
            <br>
        </div>
        <div>
            <router-view name="messageView"></router-view>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name:'JoinedNav',
    data() {
        return {
            nowNav: this.$route.query.nowNav
        }
    },
    computed: {
        userId() {
            return store.state.user.userId
        },
        courseId() {
            return store.state.course.courseId
        },
        courseName() {
            return store.state.course.courseName
        },
        coursePic() {
            return store.state.course.coursePic
        }
    },
    watch: {
        '$route.query.nowNav'(newNav) {
            if(newNav == 'course-message' || newNav == 'course-knowledge' || newNav == 'my-evaluation' || newNav == 'start-test') {
                let oldEleID = document.getElementById(this.nowNav)
                oldEleID.style.backgroundColor = '#5B86E5'
                let thisEleID = document.getElementById(newNav);
                // this.changNav(newNav)
                thisEleID.style.backgroundColor = '#4C6EB8';
                this.nowNav = newNav
            } 
        }
    },
    mounted() {
        let thisEleID = document.getElementById(this.$route.query.nowNav);
        if(thisEleID != null) {
              thisEleID.style.backgroundColor = '#4C6EB8';
            }
    },
    methods: {
        toCourseMessage() {
            this.$router.push(
                {name: 'joinedCourseInformation', query: {userId: this.userId, courseId: this.courseId, nowNav: 'course-message'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let courseMessageID = document.getElementById('course-message');
            nowID.style.backgroundColor = '#5B86E5';
            courseMessageID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'course-message'
        },
        toCourseKnowledge() {
            this.$router.push(
                {name: 'joinedCourseKnowledge', query: {userId: this.userId, courseId: this.courseId, nowNav: 'course-knowledge'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let courseKnowledgeID = document.getElementById('course-knowledge');
            nowID.style.backgroundColor = '#5B86E5';
            courseKnowledgeID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'course-knowledge'
        },
        toMyEvaluation() {
            this.$router.push(
                {name: 'joinedMyEvaluation', query: {userId: this.userId, courseId: this.courseId, nowNav: 'my-evaluation'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let myEvaluationID = document.getElementById('my-evaluation');
            nowID.style.backgroundColor = '#5B86E5';
            myEvaluationID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'my-evaluation'
        },
        toStartTest() {
            this.$router.push(
                {name: 'makePaper', query: {userId: this.userId, courseId: this.courseId, nowNav: 'start-test'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let startTestID = document.getElementById('start-test');
            nowID.style.backgroundColor = '#5B86E5';
            startTestID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'start-test'
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
    .joinedNav {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        height: 590px;
        width:15%;
        border-radius: 15px;
    }
    .joinedNav .user-message {
        margin: 0;
        padding: 0;
        height: 120px;
        width: 100%;
        position: relative;
        left: 50%;
        top: 0%;
        transform: translate(-50%,15%);
        /* background-color: red; */
    }
    .joinedNav .user-message .nav-head-portrait {
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
    .joinedNav .user-message .courseName {
        margin: 0;
        padding: 15px;
        cursor: pointer;
        color: white;
        text-align:center;
        font-size: 15px;
    }
    .joinedNav .function-router-link {
        margin: 0;
        padding: 0;
        height: 200px;
        width: 100%;
        position: relative;
        top: 25px;
        /* background-color: red; */
    }
    .joinedNav .function-router-link .router-link {
        height: 90px;
        width: 100%;
        text-decoration: none;
        margin: 0;
        border: none;
        margin-top: -8%;
        margin-bottom: -8%;
        border-radius: 10px;
        font-size: 25px;
        cursor: pointer;
        background-color: #5B86E5;
        color: white;
        position: relative;
        left: 0%;
        top: 25%;
    }
    .joinedNav .function-router-link .router-link:hover {
        background-color: #4C6EB8;
    }
</style>