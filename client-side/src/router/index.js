import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: "/overview",
          name: 'overview',
          component: () => import("../views/DashboardView.vue")
        },
        {
          path: '/orders/area',
          name: 'order',
          component: () => import('../views/OrdersView.vue'),
        },
      ],
    },
   
  ],
})

export default router
