<template>
    <div class="userNav">
        <span class="title">自主学习评测系统(管理员)</span>
        <div class="user-container" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <span class="user-info">
            <img src="/touxiang.jpg" alt="User Avatar">
            <router-link to="/Welcome"  class="Jump" ><button class="out">退出登录</button></router-link>
          </span>
        </div>
        
          
      
      </div>
  </template>
  
  <script>
  export default {
      name:'AdminBar',
      methods: {
        quit() {
          this.$store.commit('user/setUserId', '')
          this.$store.commit('user/setAvatar', '')
          this.$store.commit('user/setUserName', '')
          this.$store.commit('user/setUserType', '')
          sessionStorage.setItem('token', 'token');
        }
      }
  }
  </script>
  
  <style scoped>
  .out {
    cursor: pointer;
  }
  .out{
    font-size: 13px;
    color: white;
    background-color:  #5B86E5;
    border:none;
  }
  .Jump{
    color: white;
    background-color:  #5B86E5;
   
  }
      .userNav .user-container .dropdown .Jump{
      color:white
    }
    .userNav {
     margin-right: 20px;
      background-color: #5B86E5;
    
      font-weight: 100;
      height: 60px;
      width: 99%;
      display: flex;
      align-items: center;
      font-size: 20px;
      letter-spacing: 3px;
      padding-left: 10px;
      border-radius: 10px;
    }
    
    .userNav .title {
      color:white;
      font-size: 25px;
      flex: 1;
      position: relative;
      top: -2px;
    }
    
    .userNav .user-container {
      display: inline-block;
      position: relative;
    }
    
    .userNav .user-container .user-info {
      cursor: pointer;
      width: 100px;
      background-color: #5B86E5;
      color: white;
      font-weight: 100;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 20px;
      letter-spacing: 3px;
      padding-left: 10px;
      border-radius: 10px;
    }
    
    .userNav .user-container .user-info > img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    
    .userNav .user-container .dropdown {
      
      font-size: 15px;
      display: none;
      list-style: none;
      padding: 1px;
      margin: 0;
      position: absolute;
      top: 60px;
      right: 0;
      border: 1px solid black;
      background-color: #5B86E5;
      border-radius: 10px;
    }
    
    .userNav .user-container .dropdown li {
      padding: 8px;
    }
    
    .userNav .user-container .dropdown a {
      text-decoration: none;
      color: #333;
    }
    
    .userNav .user-container .user-info:hover + .dropdown {
      display: block;
      z-index: 999;
    }
    
    .userNav .user-container .dropdown:hover {
      display: block;
      z-index: 999;
    }
    </style>
    