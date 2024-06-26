import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [], // 权限设置
    introduction: '', // 新增
    lastestResumeID: '' // 该用户最新的简历文件ID
  }
}
const getters = {
  token: state => state.token,
  name: state => state.name,
  avatar: state => state.avatar,
  roles: state => state.roles,
  introduction: state => state.introduction
};

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 新增
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 权限设置
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.lastestResumeID = id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('aaa')
      login({ userName: username.trim(), password: password }).then(response => {
        console.log('aaaaaaaaaaaaaab', response)
        const { data } = response.data
        console.log(data)
        commit('SET_NAME', username.trim())
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', 'I am a super administrator')// 权限设置
        commit('SET_ID', data.id)
        // commit('SET_ROLES', ['admin'])// 权限设置
        console.log('aaaaaaaaaaaaaaaaaaaaa',state)
        setToken(data.tokenValue)
        Cookies.set('satoken', data.tokenValue, { expires: 700})
        console.log('666', Cookies.get('satoken'))
        console.log('1')
        commit('SET_TOKEN', data.tokenValue)
        resolve()
      }).catch(error => {
        console.error('Error in Promise:', error)
        reject(error, '用户名或密码错误')
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log('Cookies.get(satoken):', Cookies.get('satoken'))
      console.log('store.getters.name:', store.getters.name)
      // stop()
      // getInfo(state.token).then(response => {
      getInfo({ 'userName': store.getters.name }, Cookies.get('satoken')).then(response => {
        const { data } = response

        console.log('data:', data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data
        const { roles, userName, avatar, introduction } = data.data// 权限设置
        console.log('roles:', roles)

        // 必须保证不是一个空的数组
        if (!roles || roles.length <= 0) { // 权限设置
          reject('getInfo: roles must be a non-null array')// 权限设置
        }// 权限设置
        console.log(roles)// 权限设置
        // 存储值
        commit('SET_NAME', userName)
        commit('SET_ROLES', roles) // 权限设置
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)// 权限设置
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(store.getters.name, Cookies.get('satoken')).then((response) => { // 传入Cookies
        console.log('response', response)
        // Cookies.remove('satoken') // 退出登录时清除Cookies
        // commit('SET_ROLES', []) //权限设置
        removeToken() // must remove  token  first
        resetRouter()
        // Cookies.set('satoken', '') // 退出登录时清除Cookies
        commit('RESET_STATE')
        commit('SET_ROLES', []);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')// 权限设置
      commit('SET_ROLES', []) // 权限设置
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
