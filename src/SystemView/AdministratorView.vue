<template>
    <div>
        <AdminBar/>
    <br>
    <br>
    <!-- <StudentNav/> -->
    <!-- <admin-navigation-bar/> -->
    <router-view name='adminView' id="adminView"></router-view>
    <router-view name="messageView" id="messageView"></router-view>
    </div>
   
</template>
<script>
import AdminBar from '@/NavigationBar/AdminBar.vue'

export default {
    name: 'AdministratorView',
    components: {
        AdminBar,
    }
}
</script>

<style scoped>
    #messageView {
        position: absolute;
        left: 57%;
        top: 55%;
        transform: translate(-50%,-50%);
    }
</style>