// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI  from 'view-design'
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
Vue.use(ViewUI)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (!config.headers.hasOwnProperty('jwtToken') && token) {
      config.headers.jwtHeader = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(response => {
  if(response.headers.newtoken){
    localStorage.setItem("jwtToken",response.headers.newtoken);
  }
  return response
}, error => {
  return Promise.reject(error)
});
//登录拦截，路由守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    next();
  }else{
    if(localStorage.getItem("jwtToken")){
      next();
    }else{
      next({path:'/login'});
    }
  }
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
