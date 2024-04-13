import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/简历/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/userCenter',
    children: [{
      path: 'userCenter',
      name: 'userCenter',
      component: () => import('@/views/userCenter/index'),
      meta: { title: '个人中心', icon: 'dashboard' },
      hidden: true,
    }]
  },
]

export const asyncRoutes = [
  {
    path: '/简历',
    component: Layout,
    redirect: '/简历/在线简历',
    name: '简历',
    meta: { title: '简历', icon: 'el-icon-s-help', roles: ['admin'] },
    children: [
      {
        path: '在线简历',
        name: '在线简历',
        component: () => import('@/views/resume/onlineresume'),
        meta: { title: '在线简历', icon: 'table',roles: ['admin']}
      },
      {
        path: '简历上传',
        name: '简历上传',
        component: () => import('@/views/resume/upload'),
        meta: { title: '简历上传', icon: 'tree',roles: ['admin'] }
      }
    ]
  },

  {
    path: '/匹配结果',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '匹配结果',
        component: () => import('@/views/userresult/index'),
        meta: { title: '匹配结果', icon: 'form',roles: ['admin'] }
      }
    ]
  },

  {
    path: '/企业管理',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '企业管理',
        component: () => import('@/views/manage/index'),
        meta: { title: '企业管理', icon: 'documentation' ,roles: ['editor']}
      }
    ]
  },

  {
    path: '/员工管理',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '员工管理',
        component: () => import('@/views/usermanage/index'),
        meta: { title: '员工管理', icon: 'peoples' ,roles: ['editor']}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
