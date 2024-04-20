// 在 store/modules/evaluation.js 文件中
const state = {
  data: null // 初始值为空，或者根据需要设置默认值
}

const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  }
}

const actions = {
  updateData({ commit }, data) {
    commit('SET_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

