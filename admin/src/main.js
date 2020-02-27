import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import http from './http'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = http

// 全局都能访问
Vue.mixin({
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
