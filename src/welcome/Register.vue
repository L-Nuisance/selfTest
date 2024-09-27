<template>
    <div class="register">
        <form action="" id="register-all">
            <legend>用户注册</legend>
            <!-- 获取手机号 -->
            <label for="phone" id="get-phone" class="R-get-input">
                <span>手机号</span>
                <span id="errorphone" class="phoneError">手机号码错误！</span>
                <input type="text" name="phone" id="phone-input" v-model="phone" placeholder="phone/*此项为必填项*" maxlength="11" @blur="isTel()" @input="buttonAbled()">
            </label>
            <br>
            <!-- 获取验证码 -->
            <label for="code" id="get-code" class="R-get-input">
                <span>验证码</span>
                <br>
                <input type="text" name="code" id="code-input" maxlength="6" v-model="code" placeholder="code">
                <input type="button" id="R-get-code-button" class="R-action-button" v-bind:disabled="isDisabled" value="获取验证码" @click="sendCode()">
            </label>
            <br>
            <!-- 获取第一次密码 -->
            <label for="password" id="getpassword" class="R-get-input">
                <span class="first" id="errorPWD">密码应为长度不能小于8位且不能大于20位字符,必须包含大写字母、小写字母、数字和特殊符号！</span>
                <br>
                <span>设置密码</span>
                <input type="password" name="password" id="password-input" maxlength="20" v-model="password" placeholder="password/*此项为必填项*" @input="isPWD()">
            </label>
            <br>
            <!-- 获取第二次密码 -->
            <label for="again-password" id="again-getpassword" class="R-get-input">
                <span>再次输入密码</span>
                <span class="second" id="errorSame">两次密码不一致！</span>
                <input type="password" name="again_password" id="again-password-input" maxlength="20" v-model="again_password" placeholder="password/*此项为必填项*" @input="isSame()">
            </label>
            <br>
            <!-- 设置用户类型 -->
            <label for="user_type" id="get-type" class="R-get-input">
                <span>设置用户类型</span>
                <select v-model="user_type" name="user_type" id="select-type">
                    <option value="student" selected>学生</option>
                    <option value="teacher">教师</option>
                </select>
            </label>
            <br>
            <button type="button" id="register-button" class="R-action-button" @click="register()">注册</button>
            <button type="button" id="cancel-button" class="R-action-button" @click="backLogIn()">返回</button>
         </form>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'Register',
        data(){
            return{
                phone:'',
                code:'',
                true_code:'-1',
                password:'',
                again_password:'',
                user_type:'student',
                isDisabled:true,
                isPhone:false,
                isPassword:false,
                isSamePWD:false
            }
        },
        methods: {
            //切换回登陆组件
            backLogIn() {
                this.$parent.changComponent("LogIn");
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
                let btn = document.getElementById("R-get-code-button"),
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
                let btn = document.getElementById("R-get-code-button");
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
            isPWD() {
                let PWD = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._\+(){}])[0-9a-zA-Z!@#$%^&*,\\._\+(){}]{8,20}$/;
                let erPWD = document.getElementById("errorPWD")

                if(PWD.test(this.password) || this.password=='') {
                    this.isPassword = true;
                    erPWD.style.display = 'none'
                }else{
                    this.isPassword = false;
                    erPWD.style.display = 'block'
                }
            },
            isSame() {
                let erSame = document.getElementById("errorSame")
                if(this.password == this.again_password &&this.password!=''){
                    this.isSamePWD = true;
                    erSame.style.display = 'none';
                }else if(this.password != this.again_password &&this.password != ''){
                    this.isSamePWD = false;
                    erSame.style.display = 'block';
                }
            },
            register() {
                if (this.isPhone && this.true_code == this.code && this.isPassword && this.isSamePWD) {
                    var registerData = {
                        phone: this.phone,
                        password: this.password,
                        again_password: this.again_password,
                        user_type: this.user_type
                    };
                    console.log(registerData)
                    axios.defaults.headers.post["Content-type"] = "application/json";
                    axios
                        .post("http://43.138.136.200:8090/welcome/register",JSON.stringify(registerData))
                        .then ( (res) => {
                                alert(res.data.prompt);
                                if(res.data.requestCode == '3_01'){
                                    this.backLogIn();
                                }
                            },
                            (error) => {
                                console.log('请求错误')
                                alert('请求失败！')
                            }
                        )
                }else {
                    console.log('请求失败！')
                    alert('数据不全或错误！')
                }
            },
            sendCode () {
                if(this.isPhone) {
                    axios.get("http://43.138.136.200:8090/welcome/sendCodeRegister?phone=" + this.phone).then (
                        (success) => {
                            console.log(success.data);
                            if(success.data.requestCode == '2_01'){
                                this.startTiming(60);
                                this.true_code = success.data.code;
                            }else if(success.data.requestCode == '2_00'){
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
    }
</script>

<style scoped>
    .register {
        background-color: white;
        border-radius: 50px;
        width: 735px;
        height: 600px;
    }
    #register-all {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-47.5%, -57.5%); 
        font-size: 20px;
    }
    #phone-input {
        width: 700px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #code-input {
        width: 550px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #password-input {
        width: 700px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    #again-password-input {
        width: 700px;
        height: 60px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    .R-get-input {
        font-size: 20px;
    }
    #get-phone {
        position: relative;
        top: 30px;
    }
    #get-code {
        position: relative;
        top: 35px;
    }
    #getpassword {
        position: relative;
        top: 35px;
    }
    #again-getpassword {
        position: relative;
        top: 40px;
    }
    #get-type {
        position: relative;
        top: 60px;
    }
    #select-type {
        width: 80px;
        height: 30px;
        font-size: 20px;
        border-radius: 5px;
        position: relative;
        left: 25px;
    }
    button:hover {
        background-color: #6e94e5;
    }
    .R-action-button {
        font-size: 25px;
        padding: 10px 20px;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
    }
    #R-get-code-button {
        height: 50px;
        width: 150px;
        background-color: #ccc;
        font-size: 20px;
        border-radius: 20px;
        position: relative;
        top: 10px;
    }
    #register-button {
        border-radius: 5px;
        width: 150px;
        position: relative;
        top: 70px;
        left: 100px;
    }
    #cancel-button {
        border-radius: 5px;
        width: 150px;
        position: relative;
        top: 70px;
        left: 250px;
    }
    .phoneError {
        margin: 0;
        padding: 0;
        color: red;
        display: none;
        font-size: 10px;
        position: relative;
        left: 70px;
        bottom: 15px;
    }
    #getpassword .first {
        margin: 0;
        padding: 0;
        color: red;
        font-size: 10px;
        position: relative;
        left: 12.5%;
        top: 45px;
        display: none;
    }
    #again-getpassword .second {
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