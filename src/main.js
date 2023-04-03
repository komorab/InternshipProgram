import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/globall.css'
import request from "@/utils/request";

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.request=request

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
