import {asyncRoutes, constantRoutes} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  console.log('roles:', roles)
  console.log('route:', route)
  // roles = [roles];
  if (route.meta && route.meta.roles) {
    console.log('111')
    console.log('route.meta.roles:', route.meta.roles)
    console.log('333',roles.some(role => route.meta.roles.includes(role)))
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    console.log('222')

    // console.log('route.meta.roles:', route.meta.roles)
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []
// console.log('routes:', routes)
//   routes.forEach(route => {
//     const tmp = {...route}
//     if (hasPermission(roles, tmp)) {
//       // console.log('tmp:', tmp)
//       console.log('hasPermission:', hasPermission(roles, tmp))
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//
//   return res
// }
export function filterAsyncRoutes(routes, roles) {
  console.log('routes:', routes)
  console.log('roles:', roles)
  return routes.filter(route => {
    if (hasPermission(roles, route)) {
      // console.log('hasPermission:', hasPermission(roles, route))
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles);
      }
      return true;
      }else if(route.children){
      route.children = filterAsyncRoutes(route.children, roles);
      return route.children && route.children.length;
    }

    return false;
  });
}


const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      console.log('roles:', roles)
      roles=[roles]
      console.log('roles:', roles)
      let accessedRoutes
      if (roles.includes('超管')) {
        console.log('11111')
        accessedRoutes = asyncRoutes || []
      } else{ // 通过所属的角色去过滤路由，生成新的路由表
        console.log('22222')
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      console.log('accessedRoutes:', accessedRoutes)
      console.log('asyncRoutes:', asyncRoutes)
      console.log('33333')
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
