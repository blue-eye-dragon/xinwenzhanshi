 //进行路由的初始化和注册
 //导入
 import VueRouter from 'vue-router'
 //注册
 import Vue from 'vue'
 Vue.use(VueRouter)
 import Login from '@/views/login'
 import Home from '@/views/home'
 //初始化
 const router = new VueRouter({
     routes: [
        {path:'/login',component:Login},
        {path:'/',component:Home}
     ]
 })
//导出
export default router