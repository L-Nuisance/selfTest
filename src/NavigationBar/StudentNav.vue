<template>
    <div class="studentNav">
        <div class="user-message">
            <!-- 用户头像展示 -->
            <img :src="avatar" class="nav-head-portrait">
            <!-- 用户名 -->
            <p class="user-name" v-text="userName"></p>
        </div>
        <div class="function-router-link">
            <button class="router-link" id="my-courses"
                    @click="toMyCourses()"
                    @mouseenter="inEvent('my-courses')"
                    @mouseout="outEvent('my-courses')">我的课程</button>
            <br>
            <br>
            <br>
            <button class="router-link" id="join-course"
                    @click="toJoinCourse()"
                    @mouseenter="inEvent('join-course')"
                    @mouseout="outEvent('join-course')">加入课程</button>
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
    name:'StudentNav',
    data() {
        return {
            // userName: store.state.user.userName,
            // userId: store.state.user.userId,
            // avatar: store.state.user.avatar,
            nowNav: this.$route.query.nowNav
        }
    },
    watch: {
        '$route.query.nowNav'(newNav) {
            if(newNav == 'my-courses' || newNav == 'join-course') {
                let oldEleID = document.getElementById(this.nowNav)
                oldEleID.style.backgroundColor = '#5B86E5'
                let thisEleID = document.getElementById(newNav);
                // this.changNav(newNav)
                thisEleID.style.backgroundColor = '#4C6EB8';
                this.nowNav = newNav
            }
        }
    },
    computed: {
        userId() {
            return store.state.user.userId
        },
        userName() {
            return store.state.user.userName
        },
        avatar() {
            return 'data:image/png;base64,' + store.state.user.avatar
        }
    },
    mounted() {
        let thisEleID = document.getElementById(this.$route.query.nowNav);
        if(thisEleID != null) {
              thisEleID.style.backgroundColor = '#4C6EB8';
            }
    },
    methods: {
        toMyCourses() {
            this.$router.push(
                {name: 'myCourses', query: {userId: this.userId, nowNav: 'my-courses'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let myCoursesID = document.getElementById('my-courses');
            nowID.style.backgroundColor = '#5B86E5';
            myCoursesID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'my-courses';
        },
        toJoinCourse() {
            this.$router.push(
                {name: 'joinCourse', query: {userId: this.userId, nowNav: 'join-course'}}
            )
            let nowID = document.getElementById(this.nowNav);
            let joinCourseID = document.getElementById('join-course');
            nowID.style.backgroundColor = '#5B86E5';
            joinCourseID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'join-course';
            // this.changNav('join-course');
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
        },
        changNav(theNav) {
            this.$store.commit('user/setStuNav', theNav)
        }
    }
}
</script>

<style>
    .studentNav {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        height: 590px;
        width: 15%;
        border-radius: 15px;
    }
    .studentNav .user-message {
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
    .studentNav .user-message .nav-head-portrait {
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
    .studentNav .user-message .user-name {
        margin: 0;
        padding: 15px;
        cursor: pointer;
        color: white;
        text-align:center;
        font-size: 15px;
    }
    .studentNav .function-router-link {
        margin: 0;
        padding: 0;
        height: 200px;
        width: 100%;
        position: relative;
        top: 25px;
        /* background-color: red; */
    }
    .studentNav .function-router-link .router-link {
        height: 90px;
        width: 100%;
        margin-top: -8%;
        margin-bottom: -8%;
        text-decoration: none;
        margin: 0;
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
    .studentNav .function-router-link .router-link:hover {
        background-color: #4C6EB8;
    }
</style>