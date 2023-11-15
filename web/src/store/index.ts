import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: '',
    }
  },
  mutations: {
    getUser(state: any, n: any) {
      state.user = n;
    }
  },
  actions: {}
})

export default store
