<template>
    <div class="login" v-loading="isLoading" element-loading-text="正在登陆中...">
        <form action="" id="login-all">
                <legend>用户登录</legend>
                <label for="account" class="L-get-input">
                    <span>账户/手机号</span>
                    <br>
                    <input type="text" name="account" id="account-input" maxlength="11" v-model="account" placeholder="account/phone" axlength="11">
                </label>
                <br>
                <label for="password" class="L-get-input">
                    <span>密码</span>
                    <br>
                    <input type="password" name="password" id="password-input" maxlength="20" v-model="password" placeholder="password">
                </label>
                <br>
                <button type="button" name="login" id="login-button" @click="login()">登录</button>
                <br>
                <label for="register" id="to-register">
                    <span>还未拥有账户？请</span>
                    <a @click="toRegister()" id="register-link">注册</a>
                </label>
                <label for="find-password" id="to-findpassword">
                    <a @click="toFindPassword()" id="findpassword-link">忘记密码？</a>
                </label>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

    export default {
        name:'LogIn',
        data(){
            return{
                account:'',
                password:'',
                isLoading: false
            }
         },
         beforeDestroy() {
            console.log('关闭')
         },
         methods: {
            toFindPassword() {
                this.$parent.changComponent("FindPassword");
            },
            toRegister() {
                this.$parent.changComponent("Register");
            },
            login() {
                this.isLoading = true
                var loginData = {
                     account: this.account,
                     password: this.password  
                };
                axios.defaults.headers.post['Content-Type'] = 'application/json'
                axios
                    .post("http://43.138.136.200:8090/welcome/login",JSON.stringify(loginData))
                    .then(
                        (res) => {
                            this.isLoading = false
                            console.log(axios.defaults)
                            if(res.data.requestCode == "1_01"){
                                alert(res.data.prompt);
                                //登陆成功

                                //设置用户数据
                                this.$store.commit('user/setUserId', res.data.userId);
                                console.log(res.data.userId)
                                console.log(store.state.user.userId)
                                this.$store.commit('user/setAvatar', res.data.avatar);
                                this.$store.commit('user/setUserName', res.data.userName);
                                sessionStorage.setItem('token', res.data.token);
                                if(res.data.type == 'TeacherView'){
                                    this.$store.commit('user/setUserType', '教师');
                                    this.$router.push({name: 'totalCourse', query: {userId: res.data.userId, nowNav: 'check-courses'}})
                                    // window.location.replace('http://localhost:8080/' + res.data.type + '/TotalCourse?userId=' + res.data.userId + '&teacherId=' + res.data.userId 
                                    //  + '&nowNav=check-courses')
                                }else if(res.data.type == 'StudentView'){
                                    this.$store.commit('user/setUserType', '学生');
                                    this.$router.push({name: 'myCourses', query: {userId: res.data.userId, nowNav: 'my-courses'}})
                                }else if(res.data.type == 'adminView'){
                                    this.$store.commit('user/setUserType', '管理员');
                                    this.$router.push({name: 'permissionManagement', query: {nowNav: 'permission-management'}})
                                }
                            }else if(res.data.requestCode == "1_00"){
                                alert(res.data.prompt);
                            }else {
                                alert(res.data.prompt)
                            }
                        },
                        (error) => {
                            this.isLoading = false
                            console.log('请求错误')
                            alert('请求失败！')
                        }
                    )    
            }
         }
    }
</script>

<style scoped>
    .login {
        background-color: white;
        border-radius: 50px;
        width: 735px;
        height: 600px;
    }
    #login-all {
        position: relative; 
        left: 50%; 
        top: 50%; 
        transform: translate(-47.5%, -55%); 
        font-size: 20px;
    }
    .L-get-input {
        font-size: 25px;
        position: relative;
        top: 20px;
    }
    #account-input {
        width: 700px;
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
    #login-button {
        position: relative;
        top: 25px;
        font-size: 30px;
        cursor: pointer;
    }
    #login-button:hover {
        background-color: #6e94e5;
    }
    #to-register {
        position: relative;
        top: 35px;
        font-size: 15px;
    }
    #to-register #register-link {
        color: #5B86E5;
        text-decoration: none;
        cursor: pointer
    }
    #to-register #register-link:hover {
        color: #6e94e5;
        text-decoration: underline;
    }
    #to-findpassword {
        position: relative;
        top: 35px;
        left: 475px;
        font-size: 15px;
    }
    #to-findpassword #findpassword-link {
        color: #5B86E5;
        text-decoration: none;
        cursor: pointer
    }
    #to-findpassword #findpassword-link:hover {
        color: #6e94e5;
        text-decoration: underline;
    }
    #login-button {
        position: relative;
        top: 35px;
        margin: 0 auto;
        width: 700px;
        border-radius: 10px;
        padding: 10px 20px;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
    }
</style>