import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'
axios.defaults.baseURL='http://ttapi.research.itcast.cn/mp/v1_0/'
//在此设置的请求头只是在渲染页面的时候会请求一次，如果在渲染钱存在token，则会设置，否则为undefined
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const user = auth.getUser()
    if(user.token) config.headers.Authorization = `Bearer ${user.token}`
    //必须项
    return config;
  }, function (error) {
    // 对请求错误做些什么
    //必须项
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if (error.response && error.response.status === '401') {
        //不能用this.$router.push('login),因为箭头函数的this指向有问题，不指向vue实例，
        //$router 值得就是vue中的router，也就是之前在router中定义的路由
        //所以可以引入router，来进行后续的操作
        //也不能使用windos.location.href.这样会丢失一些路由的相关信息
        router.push('/login')
    }
    return Promise.reject(error);
  });
  export default axios