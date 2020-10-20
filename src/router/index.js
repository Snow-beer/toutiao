import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from "@/views/article"
import Publish from '@/views/publish'
import Test from '@/views/text.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: '',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    
  ]
  },


]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  //获取本地缓存token
  const user = JSON.parse(window.localStorage.getItem('user'))
  //判断是否从登录页面登录
  if(to.path !== '/login'){
    if(user){
      next()
    }else{
      next('/login')
    }
    
  }else{
    next()
  }
  // next()
})


export default router