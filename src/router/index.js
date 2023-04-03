import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: "/home",
    children: [
      {path: 'home', name: 'Home', component: () => import('../views/Home.vue')},
      {path: 'user', name: 'User', component: () => import('../views/User.vue')},
      {path: 'detail',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
        // children: [
        //   {
        //     path: 'parts',
        //     name: 'Parts',
        //     component: () => import('../views/Details.vue')
        //   },
        //   {
        //     path: 'alarms',
        //     name: 'Alarms',
        //     component: () => import('../views/Details.vue')
        //   }
        // ]
      }
    ]
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') return next()
  //获取用户页面token信息
  let token = localStorage.getItem("loginToken")
  //如果token数据为null则跳转到指定路径
  if (!token) return next("/login")
  next()
//   不知道为什么要点两次才能登录，偶尔点一次可以
})


export default router
