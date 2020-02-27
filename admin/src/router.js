import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/Index.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        meta: { requiresAuth: true },
        props: true // 将url参数传入CategoryEdit页面
      },
      {
        path: '/categories/list',
        component: CategoryList,
        meta: { requiresAuth: true }
      },
      {
        path: '/items/create',
        component: ItemEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/items/list',
        component: ItemList,
        meta: { requiresAuth: true }
      },
      {
        path: '/heroes/create',
        component: HeroEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/heroes/edit/:id',
        component: HeroEdit,
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/heroes/list',
        component: HeroList,
        meta: { requiresAuth: true }
      },
      {
        path: '/articles/create',
        component: ArticleEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/articles/list',
        component: ArticleList,
        meta: { requiresAuth: true }
      },
      {
        path: '/ads/create',
        component: AdEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/ads/list',
        component: AdList,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin_users/create',
        component: AdminUserEdit,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/admin_users/list',
        component: AdminUserList,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 私有且token为空
  if (to.meta.requiresAuth && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router