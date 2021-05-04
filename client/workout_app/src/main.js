import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from "@/App"
import ApiService from "@/common/api_service";

import router from './router'
import store from "./store";

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'material-icons/iconfont/material-icons.css';
import Toaster from "@/common/toaster";


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

ApiService.init()
Toaster.init()

Vue.config.productionTip = false

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
})
