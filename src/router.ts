import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { auth } from './hooks/useAuth'

import Login from './views/user/Login.vue'
import ForgotPassword from './views/user/ForgotPassword.vue'
import ChangePassword from './views/user/ChangePassword.vue'
import Dashboard from './views/Dashboard.vue'
import CourseList from './views/course/CourseList.vue'
import Course from './views/course/Course.vue'
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
    path: '/courses',
    name: 'CourseList',
    component: CourseList,   
    beforeEnter: auth,
  },
  {
    path: '/course/:action',
    name: 'Course',
    component: Course,   
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
