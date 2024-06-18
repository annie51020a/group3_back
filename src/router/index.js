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
      path: '/customermanage',
      name: 'customermanage',
      component: () => import('@/views/CustomerManage.vue')
    },
    {
      path: '/adminmanage',
      name: 'adminmanage',
      component: () => import('@/views/AdminManage.vue')
    }
  ]
});

export default router;
