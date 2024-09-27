<template>
    <div class="resetpassword">
        <form action="" id="resetpassword-all">
            <legend>设置新密码</legend>
                <label for="new_password" id="get-new-password" class="A-get-input">
                    <span class="first" id="errorPWD">密码应为长度不能小于8位且不能大于20位字符,必须包含大写字母、小写字母、数字和特殊符号！</span>
                    <br>
                    <span>新密码</span>
                    <input type="password" name="new_password" class="A-input" maxlength="20" v-model="new_password" placeholder="password" @blur="isPWD()">
                </label>
                <br>
                <label for="again_password" id="again-get-new-password" class="A-get-input">
                    <span>再次输入密码</span>
                    <span class="second" id="errorSame">两次密码不一致！</span>
                    <input type="password" name="again_password" class="A-input" maxlength="20" v-model="again_password" placeholder="password" @input="isSame()">
                </label>
                <br>
                <button type="button" id="done-button" @click="resetPassword()">完成</button>
         </form>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'ResetPassword',
        data(){
            return{
                new_password:'',
                again_password:'',
                isSamePWD: false
            }
        },
        methods: {
            backLogIn() {
                this.$parent.changComponent("LogIn")
            },
            isPWD() {
                let PWD = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._\+(){}])[0-9a-zA-Z!@#$%^&*,\\._\+(){}]{8,20}$/;
                let erPWD = document.getElementById("errorPWD")

                if(PWD.test(this.new_password) || this.password=='') {
                    this.isPassword = true;
                    erPWD.style.display = 'none'
                }else{
                    this.isPassword = false;
                    erPWD.style.display = 'block'
                }
            },
            isSame() {
                let erSame = document.getElementById("errorSame")
                if(this.new_password == this.again_password &&this.new_password!=''){
                    this.isSamePWD = true;
                    erSame.style.display = 'none';
                }else if(this.new_password != this.again_password &&this.new_password != ''){
                    this.isSamePWD = false;
                    erSame.style.display = 'block';
                }
            },
            resetPassword() {
                var resetPasswordData = {
                     password: this.new_password,
                     again_password: this.again_password
                }
                axios.defaults.headers.post["Content-type"] = "application/json";
                axios
                    .post("http://43.138.136.200:8090/welcome/login",JSON.stringify(resetPasswordData))
                    .then(
                        (res) => {
                            if(res.data.requestCode == '5_00'){
                                alert(res.data.prompt);
                                console.log(res.data);
                            }else if(res.data.requestCode == '5_01'){
                                console.log(res.data);
                            }
                        },
                        (error) => {
                            console.log('请求错误')
                            alert('请求失败！')
                        }
                    )
                this.backLogIn();
            }
        }
    }
</script>

<style scoped>
    .resetpassword {
        background-color: white;
        border-radius: 50px;
        width: 735px;
        height: 600px;
    }
    #resetpassword-all {
        position: relative; 
        left: 50%; 
        top: 50%; 
        transform: translate(0%, 10%); 
        font-size: 20px;
    }
    .A-get-input {
        position: relative;
        top: 25px;
    }
    .A-input {
        width: 700px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #again-get-new-password {
        position: relative;
        top: 40px;
    }
    button:hover {
        background-color: #6e94e5;
    }
    #done-button {
        position: relative;
        top: 60px;
        margin: 0 auto;
        width: 700px;
        border-radius: 10px;
        padding: 10px 20px;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
        font-size: 25px;
    }
    #resetpassword-all {
        position: relative;
        top: 75px;
        left: 20px;
    }
    #get-new-password .first {
        margin: 0;
        padding: 0;
        color: red;
        font-size: 10px;
        position: relative;
        left: 12.5%;
        top: 45px;
        display: none;
    }
    #again-get-new-password .second {
        margin: 0;
        padding: 0;
        color: red;
        font-size: 10px;
        position: relative;
        left: 130px;
        top: -15px;
        display: none;
    }
</style>