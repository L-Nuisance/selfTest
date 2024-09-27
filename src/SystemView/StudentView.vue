<template>
    <StudentBar/>
    <br>
    <br>
    <router-view name="studentView"/>
    <router-view name="messageView" id="messageView"/>
    <!-- <Evaluation/> -->
</template>

<script>
import StudentBar from '@/NavigationBar/StudentBar.vue';

export default {
    name: 'StudentView',
    components: {
        StudentBar,
    }
}
</script>

<style scoped>
    #messageView {
        position: absolute;
        left: 58%;
        top: 55%;
        transform: translate(-50%,-50%);
    }
</style>