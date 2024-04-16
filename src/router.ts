import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authBasic, authAdmin, authAdvisor, authAuthor } from './hooks/useAuth'

import Login from './views/user/Login.vue'
import ForgotPassword from './views/user/ForgotPassword.vue'
import ChangePassword from './views/user/ChangePassword.vue'
import Dashboard from './views/Dashboard.vue'
import CourseList from './views/course/CourseList.vue'
import Course from './views/course/Course.vue'
import ArticleList from './views/article/ArticleList.vue'
import Article from './views/article/Article.vue'
import UserList from './views/user/UserList.vue'
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
    beforeEnter: authBasic,
  },  
  {
    path: '/courses',
    name: 'CourseList',
    component: CourseList,   
    beforeEnter: authAdmin,
  },
  {
    path: '/course/:action',
    name: 'Course',
    component: Course,   
    beforeEnter: authAdmin,
  },  
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList,
    beforeEnter: authAdmin
  },
  {
    path: '/article/:action',
    name: 'Article',
    component: Article,
    beforeEnter: authAdmin
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList,
    beforeEnter: authAdmin
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
