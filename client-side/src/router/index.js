import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresVisitor: true },
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { requiresVisitor: true },
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/checkout/cart',
      name: 'cart',
      component: () => import('../views/CartProductView.vue'),
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: () => import('../views/UserOrder.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/finalcheckout',
      name: 'finalcheckout',
      component: () => import('../views/Checkout.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import("../views/DashboardView.vue")
        },
        {
          path: '/accounting/overview',
          name: 'overview',
          component: () => import('../views/OverView.vue'),
        },
        {
          path: '/accounting/expenses',
          name: 'expenses',
          component: () => import('../views/ExpensesView.vue'),
        },
        {
          path: '/orders/area',
          name: 'order',
          component: () => import('../views/OrdersView.vue'),
        },
        {
          path: '/orders/client',
          name: 'client',
          component: () => import('../views/AuthTableView.vue'),
        },
        {
          path: '/orders/status',
          name: 'status',
          component: () => import('../views/StatusOrderView.vue')
        },
        
      ],
    },
   
  ],
})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Re-hydrate user from localStorage (in case of full reload)
  if (!auth.user && localStorage.getItem('user')) {
    auth.user = JSON.parse(localStorage.getItem('user'))
  }

  if (to.meta.requiresAuth && !auth.user) {
    next({ name: 'login' })
  }
  
  if (to.meta.requiresVisitor && auth.user) {
    return next({ name: 'home' })
  }


  else {
    next()
  }
})
export default router
