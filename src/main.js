// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';
import * as VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

Vue.use(VueAxios, axios)
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Vue.config.productionTip = false

axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next)=>{
  
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`; // 'http://localhost:3000/api/casper/products';
    const vm = this;
    axios.post(api).then((response) => {
        
        if(response.data.success){
          next();
            // vm.$router.push('/');
        }else{
          next({
            path:'/Login'
          })
        }
    });
  }else{
    next();
  }
  
})
