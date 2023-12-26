import { createStore } from 'vuex'

export default createStore({
  state: {
    role: "unAuthenticated",
    username: "",
    token: "",
  },
  getters: {
  },
  mutations: {
    setRole (state , role) {
      state.role = role
    },
    setUsername (state , username) {
      state.username = username
    },
    setToken (state , token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
