<template>
    <div class="teacherNav">
        <div class="user-message">
            <!-- 用户头像展示 -->
            <img :src="'data:image/png;base64,' + avatarImgBase64" class="nav-head-portrait">
            <!-- 用户名 -->
            <p class="user-name" v-text="userName"></p>
        </div>
        <div class="function-router-link">
            <button class="router-link" id="check-courses"
                    @click="toCheckCourse()"
                    @mouseenter="inEvent('check-courses')"
                    @mouseout="outEvent('check-courses')">所有课程</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="set-courses"
                    @click="toSetCourse()"
                    @mouseenter="inEvent('set-courses')"
                    @mouseout="outEvent('set-courses')">创建课程</button>
            <br>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name:'TeacherNav',
    data() {
        return {
            teacherId: store.state.user.userId,
            userName: store.state.user.userName,
            nowNav: this.$route.query.nowNav,
            avatarImgBase64: store.state.user.avatar
        }
    },
    watch: {
        '$route.query.nowNav'(newNav) {
            if(newNav == 'check-courses' || newNav == 'set-courses') {
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
        toCheckCourse() {
            this.$router.push(
                {path:'totalCourse',query:{teacherId: this.teacherId,userId: this.$route.query.userId, nowNav: 'check-courses'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let checkCourseID = document.getElementById('check-courses');
            nowID.style.backgroundColor = '#5B86E5';
            checkCourseID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'check-courses';
        },
        toSetCourse() {
            this.$router.push(
                {path:'createCourse',query:{teacherId: this.teacherId,userId: this.$route.query.userId, nowNav: 'set-courses'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let setCourseID = document.getElementById('set-courses');
            nowID.style.backgroundColor = '#5B86E5';
            setCourseID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'set-courses';
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

<style>
    .teacherNav {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        height: 590px;
        width: 15%;
        border-radius: 15px;
    }
    .teacherNav .user-message {
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
    .teacherNav .user-message .nav-head-portrait {
        margin: 0;
        padding: 0;
        height: 80px;
        width: 40%;
        border-radius: 25px;
        cursor: pointer;
        position: relative;
        left: 50%;
        transform: translate(-50%,0%);
    }
    .teacherNav .user-message .user-name {
        margin: 0;
        padding: 15px;
        cursor: pointer;
        color: white;
        text-align:center;
        font-size: 15px;
    }
    .teacherNav .function-router-link {
        margin: 0;
        padding: 0;
        height: 200px;
        width:100%;
        position: relative;
        top: 25px;
        /* background-color: red; */
    }
    .teacherNav .function-router-link .router-link {
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
    .teacherNav .function-router-link .router-link:hover {
        background-color: #4C6EB8;
    }
</style>