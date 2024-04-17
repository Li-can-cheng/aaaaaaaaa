import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // 引入插件
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  plugins: [createPersistedState({
    storage: window.localStorage,  // 指定使用 localStorage 作为存储介质
    paths: ['user', 'settings', 'permission', 'app']    // 举例，只持久化 user 和 settings 模块
  })]
})

export default store
