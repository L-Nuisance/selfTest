import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App)

// // 从 sessionStorage 获取状态数据
if (!sessionStorage.getItem('vuex_state')) {
  sessionStorage.setItem('vuex_state', JSON.stringify(store.state));
}

if (!sessionStorage.getItem('token')) {
  sessionStorage.setItem('token', 'token');
}

store.subscribe((mutation, state) => {
  sessionStorage.setItem('vuex_state', JSON.stringify(state));
});

router.beforeEach((to, from, next) => {
  let body = document.querySelector('body');
  if(to.path == '/Welcome') {
    body.style.backgroundColor = '#5B86E5'
    next()
  }else {
    body.style.backgroundColor = 'white'
    let tokenData = {
      token: sessionStorage.getItem('token'),
      url: to.path
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios
      .post('http://43.138.136.200:8090/token/checkToken', JSON.stringify(tokenData))
      .then(
        (res) => {
          if(res.data.code == 'success') {
            next()
          }else if(res.data.code == 'error') {
            alert('您暂时没有该用户的使用权限')
            next('/Welcome')
          }
        },
        (error) => {
          alert('请您先登录')
          next('/Welcome')
        }
      )
  }
});



router.afterEach((to, from) => {
  store.replaceState(JSON.parse(sessionStorage.getItem('vuex_state')));
});

app.use(router).use(store).use(ElementPlus).mount('#app')