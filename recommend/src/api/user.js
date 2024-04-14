import request from '@/utils/request'
import axios from 'axios'

export function login(data) {
  console.log('data', data)
  return axios({
    url: '/api/auth/user/doLogin',
    method: 'post',
    data
  }).then(response => {
    console.log('1')
    console.log('Response in login function:', response)
    return response
  }).catch(error => {
    console.error('Error in login function:', error)
  })
}

export function getInfo(dto, satoken) {
  console.log('dto', dto)
  return axios({
    url: '/api/auth/user/getUserInfo',
    method: 'post',
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      'satoken': satoken // 关键代码, 注意参数名字是 satoken
    },
    data: dto
  })
}

export function logout(name, satoken) {
  console.log('name', name)
  console.log('satoken', satoken)
  return axios({
    url: '/api/auth/user/logOut',
    method: 'get',
    withCredentials: true,
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'satoken': satoken // 关键代码, 注意参数名字是 satoken
    },
    params: {
      userName: name
    }
  })
}
/*
菜单管理相关的API请求函数
*/
const api_name = '/api/auth/user'

export default {

  listEnterpriseVo(data) {
    return axios({
      url: `${api_name}/listUser`,
      method: 'get',
      params: data
    })
  }
}

