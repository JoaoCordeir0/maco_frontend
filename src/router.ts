import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { auth } from './hooks/useAuth'

import Login from './views/Login.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import ChangePassword from './views/ChangePassword.vue'
import Dashboard from './views/Dashboard.vue'
import NotFound from './views/NotFound.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { layout: 'empty' },
  },
  {
    path: '/changepassword/:token',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { layout: 'empty' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,   
    beforeEnter: auth,
  },  
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'empty' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
