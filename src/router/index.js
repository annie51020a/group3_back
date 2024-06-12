import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/NewsManage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/home/LoginAdmin.vue')
    },
    {
      path: '/newsmanage',
      name: 'newsmanage',
      component: () => import('@/views/NewsManage.vue')
    },
    {
      path: '/activitymanage',
      name: 'activitymanage',
      component: () => import('@/views/ActivityManage.vue')
    },
    {
      path: '/productmanage',
      name: 'productmanage',
      component: () => import('@/views/ProductManage.vue')
    },
    {
      path: '/membermanage',
      name: 'membermanage',
      component: () => import('@/views/MemberManage.vue')
    },
    {
      path: '/ordermanage',
      name: 'ordermanage',
      component: () => import('@/views/OrderManage.vue')
    },
    {
      path: '/adminmanage',
      name: 'adminmanage',
      component: () => import('@/views/AdminManage.vue')
    }
  ]
})

export default router
