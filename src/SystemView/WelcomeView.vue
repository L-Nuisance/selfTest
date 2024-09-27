<template>
   <div class="waibu">
    <div class="buju">
       <div class="wenzi">欢迎来到</div>
       <div class="wenzi">自主学习测评系统</div>
       <div class="zimu">S</div>
       <component :is="tabComponent" class="ceshi"/>
    </div>
    </div>
</template>

<script>
import LogIn from '@/welcome/LogIn';
import Register from '@/welcome/Register';
import FindPassword from '@/welcome/FindPassword';
import ResetPassword from '@/welcome/ResetPassword';

var val = "LogIn"

export default {
    name:'WelcomeView',
    components: {
        LogIn,
        Register,
        FindPassword,
        ResetPassword,
        nowID:'1111'
    },
    data(){
        return {
            tabComponent:"LogIn"
        }
    },
    methods:{
        changComponent(val) {
            this.tabComponent=val;
        }
    }
}
</script>

<style scoped>
 .zimu{
            height: 120px;
            background-color: #5B86E5;
            font-size: 100px;
            display: flex;
           padding: 20px;
            align-items: center;
            border-top-right-radius: 100px;
            border-bottom-right-radius: 100px;
            margin-top: 100px;
            width:120px;
            margin-left: 100px;
          color: #ABC1F2;
        }
        .buju{
            display: flex;
            flex-direction: column;
        }
        .wenzi{
            margin-left: 50px;
            margin-top: 70px;
            font-size: 200%;
            width: 280px; /* 矩形1的左半侧宽度 */
            height: 30px; /* 与矩形1等高 */
            background-color: transparent;
            color:#007BFF;
            padding: 0px; /* 为文字添加内边距，以增加可读性 */
        }
        body {
            font-family: Arial, sans-serif;
            background-color:#5B86E5;
        } 
        .waibu{
            width:1097px;
            height: 600px;
            background-color: #ABC1F2;
            border-radius:50px;
            position: absolute; /* 使用绝对定位 */
            left: 50%; /* 水平居中 */
            top: 50%; /* 垂直居中 */
            transform: translate(-50%, -50%); 
        }
        h2 {
            text-align: center;
        }
        .ceshi {
            position: absolute;
            left: 50%; /* 水平居中 */
            top: 50%; /* 垂直居中 */
            transform: translate(-25%, -50%); 
        }
        legend {
        font-size: 50px;
        margin: 0;
        padding: 0;
    }
</style>