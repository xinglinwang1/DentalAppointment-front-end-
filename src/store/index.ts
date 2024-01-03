import { createStore } from 'vuex'

// 在 store.js 中
export default createStore({
  state: {
    role: localStorage.getItem('role') || 'unAuthenticated',
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setRole(state, role) {
      state.role = role;
      // 将数据保存到 LocalStorage
      localStorage.setItem('role', role);
    },
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {
    // 在这里可以添加异步操作
  },
  modules: {
    // 在这里可以添加模块
  },
});
