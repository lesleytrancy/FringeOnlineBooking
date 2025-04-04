import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/EventList.vue')
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: () => import('../views/EventDetailsPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('../views/VerifyEmail.vue'),
    props: route => ({ email: route.query.email, token: route.query.token })
  }
]

const router = createRouter({
  history: createWebHistory('/'), //process.env.BASE_URL
  routes
})

export default router
