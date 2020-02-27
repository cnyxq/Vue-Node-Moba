import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
