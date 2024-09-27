<template>
    <div class="findpassword">
        <form action="" class="findpassword-all">
            <legend>找回密码</legend>
            <label for="phone" id="get-the-phone" class="F-get-input">
                <span>手机号</span>
                <span id="errorphone" class="phoneError">手机号码错误！</span>
                <input type="text" name="phone" id="F-phone-input" maxlength="11" v-model="phone" placeholder="phone" @blur="isTel()" @input="buttonAbled()">
            </label>
            <br>
            <label for="code" id="get-the-code" class="F-get-input">
                <span>验证码</span>
                <br>
                <input type="text" name="code" id="F-code-input" maxlength="6" v-model="code" placeholder="code">
                <input type="button" id="F-get-code-button" value="获取验证码" v-bind:disabled="isDisabled" @click="sendCode()">
            </label>
            <br>
            <button type="button" id="next" class="F-action-button" @click="toResetPassword()">下一步</button>
            <button type="button" id="back" class="F-action-button" @click="backLogIn()">返回</button>
         </form>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'FindPassword',
        data(){
            return{
                phone:'',
                code:'',
                isDisabled:'true',
                isPhone:false,
                true_code:'-1'
            }
        },
        methods: {
            backLogIn() {
                this.$parent.changComponent("LogIn");
            },
            toResetPassword() {
                if(this.true_code == this.code){
                    this.$parent.changComponent("ResetPassword");
                }else {
                    alert('请输入正确的验证码！')
                }
            },
            //判断手机号码是否正确
            isTel() {
                let phoneReg = /^1[3456789]\d{9}$/,
                    errorphone = document.getElementById('errorphone');
                if(phoneReg.test( this.phone )||this.phone==''){
                    errorphone.style.display = 'none'
                }else {
                    errorphone.style.display = 'block'
                }
            },
            //根据输入情况调整获取验证码的状态
            buttonAbled() {
                let btn = document.getElementById("F-get-code-button"),
                    phoneReg = /^1[3456789]\d{9}$/;
                //输入框中为空或不是电话号码时按纽不可用
                if(this.phone == ''||!phoneReg.test(this.phone)){
                    this.isDisabled=true,
                    btn.style.backgroundColor = "#ccc";
                    this.isPhone = false;
                }else if(phoneReg.test(this.phone)){
                    this.isDisabled=false,
                    btn.style.backgroundColor = "#5B86E5";
                    this.isPhone = true;
                }
            },
            //获取验证码倒计时
            startTiming(waitTime) {
                let btn = document.getElementById("F-get-code-button");
                let timer = setInterval(() => {
                        this.isDisabled = true;
                        btn.style.backgroundColor='#ccc';
                        btn.setAttribute('value',waitTime + '秒后再获取');
                        if(waitTime==0){
                            clearInterval(timer);
                            this.isDisabled = false;
                            btn.style.backgroundColor='#5B86E5'
                            btn.setAttribute('value','获取验证码');
                        }
                        waitTime--;
                    },1000)
            },
            //发送验证码
            sendCode () {
                axios.get("http://43.138.136.200:8090/welcome/findPassword?phone=" + this.phone).then (
                        (success) => {
                            console.log(success.data);
                            if(success.data.requestCode == '4_01'){
                                this.startTiming(60);
                                this.true_code = success.data.code;
                            }else if(success.data.requestCode == '4_00'){
                                this.true_code = '-1';
                            }
                            alert(success.data.prompt);
                        },
                        (error) => {
                            console.log("请求失败！");
                            alert("验证码发送失败！");
                            this.true_code = '-1';
                        }
                )
            }
         }
    }
</script>

<style scoped>
    .findpassword {
        background-color: white;
        border-radius: 50px;
        width: 735px;
        height: 600px;
    }
    .findpassword-all {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-47.5%, -60%); 
        font-size: 20px;
    }
    .F-get-input {
        position: relative;
        top: 25px;
    }
    #get-the-code {
        position: relative;
        top: 50px;
    }
    button:hover {
        background-color: #6e94e5;
    }
    .F-action-button {
        position: relative;
        top: 50px;
        width: 150px;
        font-size: 25px;
        border-radius: 5px;
        padding: 10px 20px;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
        position: relative;
        left: 75px;
        top: 75px;
    }
    #back {
        position: relative;
        left: 250px;
    }
    #F-get-code-button {
        border-radius: 10px;
        padding: 10px 20px;
        background-color: #ccc;
        color: #fff;
        cursor: pointer;
        border: none;
        height: 50px;
        width: 150px;
        border-radius: 20px;
        position: relative;
        top: 10px;
        font-size: 20px;
    }
    #F-code-input {
        width: 550px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #F-phone-input {
        width: 700px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #errorphone {
        display: none;
        color: red;
        font-size: 10px;
    }
</style>