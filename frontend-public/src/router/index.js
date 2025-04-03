import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../pages/EventList.vue')
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: () => import('../pages/EventDetailsPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('../pages/VerifyEmail.vue'),
    props: route => ({ email: route.query.email, token: route.query.token })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
