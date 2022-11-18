import Vue from 'vue'
import VueRouter from 'vue-router'
import ReportsView from "@/views/ReportsView"
import OrdersView from "@/views/OrdersView";
import LoginView from "@/views/LoginView";
import { store } from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-reports',
    redirect: '/reports'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable */
router.beforeEach((to, from, next) => {
  const loggedIn = store.state.security && store.state.security.user;
  if (to.name !== 'Login' && !loggedIn) next({ name: 'Login' })
  else next()
})

export default router
