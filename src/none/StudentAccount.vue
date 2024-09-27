<template>
    <div v-loading="isLoading" element-loading-text="用户信息加载中...">
      <div class="background" v-if="showAccountManagement">
        <span class="title">账号管理</span>
        <button id="systemButton" @click="returnToSystem">返回系统</button>
        <div class="link-top"></div>
        <div class="container">
          
            <button v-if="!isEditMode" @click="enterEditMode" class="change">修改个人信息</button>
            <button v-else @click="saveChanges" class="change">保存修改</button>
            <div class="editable-info">
      <span class="image-container"><img  :src="avatarBase64" alt=""> </span>
      <!-- <span v-if="isEditMode" class="edit-icon1" @click="openFileInput"><img src="./qianbi.png" alt=""></span> -->
      <span class="modify-button" v-if="isEditMode" @click="openFileInput">
        <img src="./qianbi.png" alt="" class="editImage">
      </span>
      <input v-if="isEditMode" type="file" ref="fileInput" id="fileInput" @change="displayImage">

    </div>
            <!-- <div class="editable-info">
              <div class="image-container" @click="triggerFileInput">
    <input type="file" id="file-input" style="display: none;" accept="image/*" @change="handleImageUpload" v-if="isEditMode">
    <img :src="avatarBase64" alt="五条悟">
  </div>
  
            </div> -->
  
            <div class="editable-info">
              <div class="info">
                <label>账户: <span>{{ username }}</span></label>
                <span v-if="isEditMode" class="edit-icon" @click="editInfo('username')"><img src="./qianbi.png" alt=""></span>
              </div>
            </div>
  
            <div class="editable-info">
              <div class="info">
                <label>用户ID: <span>{{ userId }}</span></label>
              </div>
            </div>
  
            <div class="editable-info">
              <div class="info">
                <div class="gender-options">
                  性别:
                  <label for="male">
                    <input type="radio" name="gender" id="male" value="male" v-model="gender" :disabled="!isEditMode"> 男
                  </label>
                  <label for="female" class="gender-option">
                    <input type="radio" name="gender" id="female" value="female" v-model="gender" :disabled="!isEditMode"> 女
                  </label>
                </div>
              </div>
            </div>
  
            <div class="editable-info">
              <div class="info">
                电话号码:{{ phoneNumber }}
              </div>
            </div>
  
            <div class="editable-info">
              <button type="button" @click="goToChangePassword" class="actionButton">修改密码</button>
            </div>
         
        </div>
      </div>
      <div v-if="showChangePassword">
        <!-- 切换到修改密码组件 -->
        <ChangePassword @back-to-account="backToAccount" />
      </div>
    </div>
  </template>
  
  <script>
  import ChangePassword from './ChangePassword.vue';
  import axios from 'axios';
import store from '@/store';
  
  export default {
    components: {
      ChangePassword,
    },
    name: 'StudentAccount',
    data() {
      return {
        userId: store.state.user.userId,
        username: '',
        gender: '',
        phoneNumber: '',
        avatarBase64: '',
        showAccountManagement: true,
        showChangePassword: false,
        editedUsername: '',
        isEditMode: false,
        isLoading: true
      };
    },
    created() {
      // 在组件挂载后获取用户信息
      this.fetchUserInfo();
    },
    methods: {
      displayImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarBase64 = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
      returnToSystem(){
        this.$router.push(
          {
            name: 'myCourses',
            query: {
              userId: this.userId,
              nowNav: 'my-courses'
            }
          }
        )
      },
      async fetchUserInfo() {
        this.isLoading = true
        try {
          // 发送请求获取用户信息
          const response = await axios.get(`http://43.138.136.200:8090/user/selectUserInformation?userId=`+this.userId);
          // 更新前端数据
          const userData = response.data.userJson;
          // this.userId = userData.userId;
          this.username = userData.name;
          this.gender = userData.sex;
          this.phoneNumber = userData.phone;
          // 更新 Base64 编码的头像数据
          this.avatarBase64 = `data:image/png;base64,${userData.avatar}`;
          this.isLoading = false
        } catch (error) {
          console.error('Error fetching user info:', error);
          this.isLoading = false
        }
      },
      goToChangePassword() {
        this.showAccountManagement = false;
        this.showChangePassword = true;
      },
      backToAccount() {
        this.showAccountManagement = true;
        this.showChangePassword = false;
      },
      editInfo(field) {
        if (field === 'username') {
          this.editedUsername = this.username;
          const newUsername = prompt('请输入新的账户名称:', this.username);
          if (newUsername.length > 15) {
      alert('账户名称不能超过15个字符，请重新输入。');
      return;
    }
          if (newUsername !== null) {
            this.editedUsername = newUsername;
            this.username=newUsername;
          }
        }
        // ... 其他字段的处理
      },
      enterEditMode() {
        this.isEditMode = true;
      },
      saveChanges() {
        const base64Data = this.avatarBase64.split(',')[1];
        const confirmChanges = window.confirm('确认要修改吗？');
        if (confirmChanges) {
          // Send updated information to the backend
          const updatedInfo = {
            userId:this.userId,
            userName: this.username,
            sex: this.gender,
            avatar:base64Data,
            // Include other fields as needed
          };
  
          // Assuming you have an API endpoint for updating user info
          axios.post('http://43.138.136.200:8090/user/updateUserInformation',updatedInfo )
            .then(response => {
            alert(response.data.prompt);
            if(response.data.requestCode == '51_01') {
              this.$store.commit('user/setAvatar', base64Data)
              this.$store.commit('user/setUserName', this.username)
              this.isEditMode=false;
            }
            })
            .catch(error => {
              console.error('Error updating user info:', error);
            });
        }
      },
      triggerFileInput() {
        document.getElementById('file-input').click();
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.avatarBase64 = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      // ... 其他方法
    },
  };
  </script>
  
  
  <style scoped>
  .modify-button>img{
          height: 30px;
      }
      .modify-button {
      margin-top: 30px;
          cursor: pointer;
          margin-left: 20%;
      }

      #fileInput {
          display: none;
      }
.change{
float:right;
  display: inline-block;
  margin-left: 70%;
  cursor: pointer;
  background-color: #5B86E5;
  position:relative;
  font-size: 20px;
  color: white;
  border-radius:15px;
  height: 50px;
  width: 150px;
  border: #EFEFEF;
}
.actionButton {
  cursor: pointer;
  background-color: #5B86E5;
  position:relative;
  bottom: 6%;
  font-size: 20px;
  color: white;
  border-radius:15px;
  height: 50px;
  width: 150px;
  border: #EFEFEF;
}
.image-container{
  display: inline-block;
}
.image-container img {

  cursor: pointer;
  margin-top: 30px;
  height: 100px;
  border: 1px solid #000000;
  border-radius: 15px;
}

.actionButton:hover {
  background-color: #4C6EB8;
}
button:hover {
  background-color: #4C6EB8;
  cursor: pointer;
}

.link-top {
  width: 100%;
  height: 1px;
  border-top: solid #ACC0D8 1px;
}

.title {
  display: block;
  font-size: 30px;
  height: 55px;
}

#systemButton {
  cursor: pointer;
  background-color: #5B86E5;
  border-top-right-radius: 15px;
  position: absolute;
  top :0;
  right:0;
  height: 55px;
  font-size: 20px;
  color: white;
  width: 200px;
}

#systemButton:hover {
  background-color: #4C6EB8;
}

.background {
  background-color: white;
  margin-left: 200px;
  height: 600px;
  position: absolute;
  width: 1150px;
  border: 3px solid #ACC0D8;
  border-radius: 15px;
 
}

body {
  font-family: Arial, sans-serif;
}

.container {
  border: 3px solid #ACC0D8;
  cursor: url(./normal.cur), pointer;
  line-height: 50px;
  font-size: 20px;
  background-color: #EFEFEF;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 450px;
  border-radius: 15px;
  position: absolute;
  left: 2%;
}

h1 {
  text-align: center;
}

.editable-info {
  position: relative;
  left: 5%;
  cursor: url(./normal.cur), pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.editable-info .info {
  flex: 1;
}

.editable-info .edit-icon {
  cursor: url(./link.cur), pointer;
}

.gender-option {
  cursor: url(./normal.cur), pointer;
  flex: 1;
  margin-left: 10px;
}

.edit-input {
  display: none;
  width: 100%;
  padding: 5px;
}
.edit-icon1{
  
}
.edit-icon img {
  height: 30px;
}
</style>
