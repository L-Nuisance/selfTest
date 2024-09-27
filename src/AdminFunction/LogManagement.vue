<template>
  <div class="Log" v-loading="isLoading" element-loading-text="日志加载中，请耐心等待...">
    <div class="top">
      <span class="title">系统日志</span>
      <input type="text" v-model="searchUser" placeholder="搜索用户" class="research">
    </div>

    <table class="tabledisplay">
      <thead>
        <tr>
          <th>日志ID</th>
          <th>用户ID</th>
          <th>用户名</th>
          <th>事件描述</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in filteredLogs" :key="log.logId">
          <td>{{ log.logId }}</td>
          <td>{{ log.userId }}</td>
          <td>{{ log.userName }}</td>
          <td>{{ log.eventDescription }}</td>
          <td>{{ log.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LogManagement',
  data() {
    return {
      searchUser: '',
      logTypeFilter: 'all',
      logs: [],
      isLoading: true
    };
  },
  computed: {
    filteredLogs() {
      const searchUser = this.searchUser.trim().toLowerCase();
      const logTypeFilter = this.logTypeFilter.toLowerCase();

      return this.logs.filter((log) => {
        const userName = log.userName.toLowerCase();
        const typeMatch = logTypeFilter === 'all' || log.type === logTypeFilter;

        return userName.includes(searchUser) && typeMatch;
      });
    },
  },
  methods: {
    fetchDataFromBackend() {
      fetch('http://43.138.136.200:8090/admin/selectLogList')
        .then(response => response.json())
        .then(data => {
          this.isLoading = false
          this.logs = data.list;
        })
        .catch(error => console.error('Error fetching data:', error));
    },
  },
  mounted() {
    this.fetchDataFromBackend();
  },
};
</script>



<style scoped>
.tabledisplay{
  margin-left: 10px;
width: 95%;
}
th,td:nth-child(1) {
width:15%;
 }
 th,td:nth-child(3) {
width:20%;
 }
.title{
  display: inline-block;
/* border:1px solid black; */
  margin-top: 10px;
  font-size: 30px;
}
.research{
  height:30px;
  margin-top: 0;
  margin-left: 70%;
  border-radius: 10px;
}
.Log{
  /* overflow: auto;
  height: 600px;
  width: 70%;
  float: right;
  box-shadow:
    5px 5px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-right: 1%; */
  margin-top: 0.5%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: auto;
}
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  font-size: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

label {
  display: block;
  margin-bottom: 5px;
}

select, input {
  margin-bottom: 10px;
}
</style>