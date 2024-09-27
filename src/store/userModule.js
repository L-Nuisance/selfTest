// modules/userModule.js
export default {
    namespaced: true,
    state() {
      return {
        userId: '',
        avatar: '',
        userName: '',
        userType: '',
        nowStuNav: 'my-courses'
      };
    },
    mutations: {
      setUserId(state, userId) {
        state.userId = userId;
      },
      setAvatar(state, avatar) {
        state.avatar = avatar;
      },
      setUserName(state, userName) {
        state.userName = userName;
      },
      setUserType(state, userType) {
        state.userType = userType;
      },
      setStuNav(state, nowStuNav) {
        state.nowStuNav = nowStuNav;
      }
    },
  };
  