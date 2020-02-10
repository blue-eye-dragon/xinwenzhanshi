import axios from 'axios'
import auth from '@/utils/auth'
axios.defaults.baseURL='http://ttapi.research.itcast.cn/mp/v1_0/'
//在此设置的请求头只是在渲染页面的时候会请求一次，如果在渲染钱存在token，则会设置，否则为undefined
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const user = auth.getUser()
    if(user.token) config.headers.Authorization = `Bearer ${user.token}`
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  export default axios