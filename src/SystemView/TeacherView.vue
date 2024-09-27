<template>
    <UserBar/>
    <br>
    <br>
    <!-- <router-link to="/TeacherView" id="ce">sdvfds</router-link> -->
    <!-- <TeacherNav/> -->
    <!-- 教师界面的导航展示区 -->
    <router-view name='teacherView' id="teacherView"></router-view>
    <router-view name="messageView" id="messageView"></router-view>
    <!-- <AccountManagement id="show"/> -->
    <!-- <AddChapters/> -->
</template>

<script>
import UserBar from '@/NavigationBar/UserBar.vue';

export default {
    name: 'TeacherView',
    components: {
        UserBar
    },
    data() {
        return {
            teacherID: this.$route.query.userID
        }
    },
}
</script>

<style scoped>
    body {
        background-color: #CCCCCC;
    }
    #messageView {
        position: absolute;
        left: 57%;
        top: 52%;
        transform: translate(-50%,-50%);
    }
    /* #teacherView {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(50%,50%);
    } */
</style>