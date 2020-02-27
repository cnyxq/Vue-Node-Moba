import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import Article from '../views/Article'
import Hero from '../views/Hero'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/article/:id', name: 'article', component: Article, props: true }
    ]
  },
  {
    path: '/hero/:id',
    name: 'hero',
    component: Hero,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
