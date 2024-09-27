<template>
    <div class="border">
      <div class="inputtextBefore">
        <span>请输入原密码:</span>
        <span><input type="password" v-model="oldPassword" class="input"></span>
      </div>
      <div class="inputtextNow">
        <span>请输入新密码:</span>
        <span>
          <input type="password" v-model="newPassword" class="input" @input="validatePassword">
          <span v-if="!isPasswordValid" class="warning">密码应为长度不能小于8位且不能大于20位字符，必须包含大写字母、小写字母和数字！</span>
        </span>
      </div>
      <div class="inputtextAgain">
        <span>再次输入新密码:</span>
        <span>
          <input type="password" v-model="confirmPassword" class="input" @input="validateConfirmPassword">
          <span v-if="isConfirmPasswordMismatch" class="warning">两次输入新密码不一致！</span>
        </span>
      </div>
      <button class="edit" @click="changePassword">修改</button>
      
      <button class="back" @click="goBack">返回</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import store from '@/store';
  
  export default {
    name: 'ChangePassword',
  
    data() {
      return {
        userId: store.state.user.userId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        isPasswordValid: false,
        isConfirmPasswordMismatch: false,
      };
    },
    methods: {
      goBack() {
        this.$emit('back-to-account');
      },
      validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
        this.isPasswordValid = passwordRegex.test(this.newPassword);
      },
      validateConfirmPassword() {
        this.isConfirmPasswordMismatch = this.newPassword !== this.confirmPassword;
      },
      async changePassword() {
        console.log("oldPassword:",this.oldPassword);
        console.log("newPassword:",this.newPassword);
        if (!this.isPasswordValid) {
          alert('密码不符合要求！');
          return;
        }
  
        if (this.isConfirmPasswordMismatch) {
          alert('两次输入新密码不一致！');
          return;
        }
  
        try {
          const response = await axios.post('http://43.138.136.200:8090/user/changePassword', {
            userId: this.userId, // 在数据载荷中包含 userId
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            
          });
  
            alert(response.data.prompt);
       
          
          
        } catch (error) {
          console.error('Error:', error);
        }
        this.goBack()
      },
    },
  };
  </script>
    
  <style scoped>
  .warning {
      color: red;
      font-size: 12px;
    }
      .input{
          font-size: 20px;
          border:none;
      }
      .border{
        margin-top: 100px;
          margin-left: 15%;
          position: relative;
          border:1px solid #F0F0F0;
          border-radius: 10px;
          box-shadow:
      5px 5px 5px rgba(0, 0, 0, 0.2),
      -5px -5px 5px rgba(0, 0, 0, 0.05);
          height: 400px;
          background-color: #F0F0F0;
          width:70%;
      }
      .inputtextBefore{
          font-size: 20px;
          width:100%;
        margin-top: 70px;
          margin-bottom: 40px;
          margin-left: 10%;
         
      }
      .inputtextNow{
          font-size: 20px;
          width:100%;
          margin-bottom: 40px;
          margin-left: 10%;
      }
      .inputtextAgain{
          font-size: 20px;
          width:100%;
          margin-bottom: 40px;
          margin-left: 10%;
      }
      .edit{
          cursor: pointer;
          width:25%;
          height:40px;
          border:none;
          background-color: #5B86E5;
          font-size: 20px;
          color: white;
          border-radius: 10px;
          margin-left: 10%;
      }
      .back{
          cursor: pointer;
          width:25%;
          height:40px;
          border:none;
          background-color: #5B86E5;
          font-size: 20px;
          color: white;
          border-radius: 10px;
          margin-left: 10%;
      }
      button:hover {
        background-color: #4C6EB8;
      }
  </style>