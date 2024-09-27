<template>
    <div class="border">
      <!-- 用户头像 -->
      <div class="user-message">
        <img src="../../public/touxiang.jpg" alt="User Avatar" class="avatar">
        <!-- 用户名 -->
        <p class="username">系统管理员</p>
      </div>
      <!-- 系统日志按钮 -->
      <div class="function-router-linkto">
        <button @click="toSystemLog()" class="link" id="system-log" @mouseenter="inEvent('system-log')" @mouseout="outEvent('system-log')">系统日志</button>
        <br>
        <br>
        <br>
        <!-- 用户权限链接 -->
        <button @click="toPermissionManagement()" class="link" id="permission-management" @mouseenter="inEvent('permission-management')" @mouseout="outEvent('permission-management')">用户权限</button>
        <br>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminNavigationBar',
    data() {
      return {
        nowNav: 'system-log'
      }
    },
    mounted() {
        let thisEleID = document.getElementById(this.$route.query.nowNav);
            if(thisEleID != null) {
              thisEleID.style.backgroundColor = '#4C6EB8';
            }
    },
    watch: {
        '$route.query.nowNav'(newNav) {
            if(newNav == 'system-log' || newNav == 'permission-management') {
                let oldEleID = document.getElementById(this.nowNav)
                oldEleID.style.backgroundColor = '#5B86E5'
                let thisEleID = document.getElementById(newNav);
                // this.changNav(newNav)
                thisEleID.style.backgroundColor = '#4C6EB8';
                this.nowNav = newNav
            }
        }
    },
    methods: {
        toSystemLog() {
            this.$router.push(
              {
                path: '/AdminView/LogManagement?nowNav=system-log',
                query: {
                  nowNav: 'system-log'
                }
              }
            )
            let nowID = document.getElementById(this.nowNav);
            let myCoursesID = document.getElementById('system-log');
            nowID.style.backgroundColor = '#5B86E5';
            myCoursesID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'system-log';
        },
        toPermissionManagement() {
          this.$router.push(
              {
                path: '/AdminView/PermissionManagement?nowNav=permission-management',
                query: {
                  nowNav: 'permission-management'
                }
              }
            )
            let nowID = document.getElementById(this.nowNav);
            let joinCourseID = document.getElementById('permission-management');
            nowID.style.backgroundColor = '#5B86E5';
            joinCourseID.style.backgroundColor = '#4C6EB8';
            this.nowNav = 'permission-management';
        },
      inEvent(linkId) {
        if(linkId != this.nowNav) {
          let linkElement = document.getElementById(linkId);
          linkElement.style.backgroundColor = '#4C6EB8';
        }
      },
      outEvent(linkId) {
        if(linkId != this.nowNav) {
          let linkElement = document.getElementById(linkId);
          linkElement.style.backgroundColor = '#5B86E5';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .user-message {
    margin: 0;
    padding: 0;
    height: 120px;
    width:100%;
    position: relative;
    left: 50%;
    top: 0%;
    transform: translate(-50%, 15%);
  }
  
  .link {
    height: 90px;
    width: 100%;
    text-decoration: none;
    margin: 0;
    margin-top: -8%;
    margin-bottom: -8%;
    border: none;
    border-radius: 10px;
    font-size: 25px;
    cursor: pointer;
    background-color: #5B86E5;
    color: white;
    position: relative;
    left: 0%;
    top: 25%;
  }
  
  .function-router-linkto {
    margin: 0;
    padding: 0;
    height: 200px;
    width: 100%;
    position: relative;
    top: 25px;
  }
  
  .border {
    margin: 0;
    padding: 0;
    background-color: #5B86E5;
    height: 590px;
    width: 15%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 居中显示内容 */
  }
  
  .avatar {
    margin: 0;
    padding: 0;
    height: 80px;
    width: 80px;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  
  .username {
    margin: 0;
    padding: 15px;
    cursor: pointer;
    color: white;
    text-align: center;
    font-size: 15px;
  }
  
  .link:hover {
    background-color: #4C6EB8;
  }
  </style>
  