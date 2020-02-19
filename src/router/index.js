 //进行路由的初始化和注册
 //导入
 import VueRouter from 'vue-router'
 //注册
 import Vue from 'vue'
 Vue.use(VueRouter)
 import Login from '@/views/login'
 import Home from '@/views/home'
 import Welcome from '@/views/welcome'
 import Notfound from '@/views/404'
 import auth from '@/utils/auth'
 import Artical from '@/views/artical'
 import Images from '@/views/images'
 import Publish from '@/views/publish'
 import Comment from '@/views/comment'
 import Fans from '@/views/fans'
 //初始化
 const router = new VueRouter({
     routes: [
        {path:'/login',component:Login},
        {
            path:'/',
            component:Home,
            children:[
                {path:'/',component:Welcome},
                {path:'/artical',component:Artical},
                {path:'/image',component:Images},
                {path:'/publish',component:Publish},
                {path:'/comment',component:Comment},
                {path:'/fans',component:Fans},
            ]
        },
        {path:'*',component:Notfound}
     ], 
 })
 router.beforeEach((to,from,next)=>{
    if(to.path !== '/login' && !auth.getUser().token) return next('/login')
    next()
 })
//导出
export default router