import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from '@/api'
import 'element-ui/lib/theme-chalk/index.css';
//导入路由
// import router from './router/index.js'
// router/index.js 可以省略index.js 默认访问index.js
// ./ ../ 用这些方法去找对应的目录并不准确， 可以用vue.cli提供的——@来访问，相当于（src路径）
//可以简写为以下的步骤
import router from '@/router'
import plugin from '@/plugin'

Vue.use(ElementUI);
Vue.use(plugin)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  //对路由进行挂载
  router
}).$mount('#app')
