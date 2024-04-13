// 引入路由器router
import router from './router'
// 引入仓库
import store from './store'
// 引入ele的提示组件
import { Message } from 'element-ui'
// 引入交互进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// 从cookie中获取token，登录了就有cookie
import { getToken } from '@/utils/auth' // get token from cookie
// 得到页面的title
import getPageTitle from '@/utils/get-page-title'
 
// 配置nprogress
NProgress.configure({ showSpinner: false }) // NProgress Configuration
 
// 白名单，不需要登录就能进入的路由
const whiteList = ['/login'] // no redirect whitelist
 
// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  //开启进度条
  NProgress.start()
 
  //给页面的title赋值
  document.title = getPageTitle(to.meta.title)
 
  // 从cookie中拿到token，有的话就放行，determine whether the user has logged in
  const hasToken = getToken()
 
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取用户信息
      // const hasGetUserInfo = store.getters.name
      const hasRoles = store.getters.roles && store.getters.roles.length > 0// 权限控制
      console.log('roles:',store.getters.roles)
      // if (hasGetUserInfo) {
      if (hasRoles) {
        console.log('执行了1')
        next()
      } else {
        console.log('执行了2')
        try {
          // get user info 重新获取用户信息
          // await store.dispatch('user/getInfo')
          // 权限控制
          const { roles } = await store.dispatch('user/getInfo')
          // 在角色权限基础上生成动态路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log('accessRoutes:',accessRoutes)
          router.options.routes = store.getters.permission_routes 
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          console.log('输出的store：',store)
          next({...to, replace: true })
          
          // next()
 
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
 
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      // 关闭进度条
      NProgress.done()
    }
  }
})
 
// 全局后置路由守卫
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})