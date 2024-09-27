<template>
  <div class="permission">
    <table id="userTable">
      <thead>
        <tr>
          <th>用户ID</th>
          <th>用户名</th>
          <th>
            <span></span>
            <label for="userTypeFilter">用户类型:</label>
            <select v-model="selectedType" @change="filterUsers">
              <option value="all">全部用户</option>
              <option value="student">学生</option>
              <option value="teacher">教师</option>
            </select>
          </th>
          <th>登录权限管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index" :data-type="user.type">
          <td>{{ user.userId }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.type }}</td>
          <td>
            <label v-for="permission in permissions" :key="permission.value">
              <input
                type="radio"
                :name="`loginPermission${index + 1}`"
                :value="permission.value"
                v-model="user.loginPermission"
                @change="toggleUserAuthority(user.userId, user.loginPermission)"
              />
              {{ permission.label }}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PermissionManagement',
  data() {
    return {
      selectedType: 'all',
      users: [],
      permissions: [
        { label: '开启', value: '1' },
        { label: '关闭', value: '0' },
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.selectedType === 'all'
        ? this.users
        : this.users.filter((user) => user.type === this.selectedType);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://43.138.136.200:8090/admin/selectUserList');
        const data = await response.json();

        if (data.requestCode === '61_00') {
          console.error('查询失败:', data.prompt);
        } else if (data.requestCode === '61_01') {
          console.log('查询成功:', data.prompt);
          this.users = data.list.map((json) => ({
            userId: json.userId,
            userName: json.userName,
            type: json.type,
            loginPermission: json.state,
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    filterUsers() {
      // 可以在这里执行其他逻辑
    },

    async toggleUserAuthority(userId, newPermission) {
      try {
        let response;
        if (newPermission === '1') {
          response = await fetch('http://43.138.136.200:8090/admin/restoreAuthority', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
            }),
          });
        } else {
          response = await fetch('http://43.138.136.200:8090/admin/forbiddenAuthority', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
            }),
          });
        }

        const data = await response.json();

        if (data.success) {
          console.log('权限切换成功:', data.prompt);
          alert(data.prompt); // 弹出后端返回的提示
          // 在这里可以执行其他逻辑，例如刷新用户列表
          this.fetchData();
        } else {
          console.error('权限切换失败:', data.prompt);
          alert(data.prompt); // 弹出后端返回的提示
          // 在这里可以处理权限切换失败的逻辑，例如提示用户或执行其他操作
        }
      } catch (error) {
        console.error('Error toggling user authority:', error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
  th,
  td:nth-child(3) {
    width: 30%;
  }
  .permission {
    /* overflow: auto;
    height: 600px;
    width: 80%;
    float: right;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2), -5px -5px 5px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    margin-right: 1%; */
    /* margin-top: 1.4%; */
    margin-top: 0.5%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
  }
  #userTable {
    margin-left: 5%;
    width: 90%;
  }
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
    position: relative;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
</style>
