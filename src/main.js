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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
