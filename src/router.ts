import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authBasic, authAdmin, authAdvisor, authAuthor } from './hooks/useAuth'

import Login from './views/auth/Login.vue'
import ForgotPassword from './views/auth/ForgotPassword.vue'
import ChangePassword from './views/auth/ChangePassword.vue'
import Dashboard from './views/Dashboard.vue'
import Courses from './views/admin/Courses.vue'
import Course from './views/admin/Course.vue'
import Users from './views/admin/Users.vue'
import NotFound from './views/NotFound.vue'
import Submissions from './views/advisor/Submissions.vue'
import MyCourses from './views/advisor/MyCourses.vue'
import Submit from './views/author/Submit.vue'
import Settings from './views/admin/Settings.vue'
import Events from './views/author/Events.vue'
import Corrections from './views/author/Corrections.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Login,
    meta: { layout: 'empty' },
  },

  // Auth routes
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

  // Admin routes
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,   
    beforeEnter: authAdmin,
  },
  {
    path: '/course/:action',
    name: 'Course',
    component: Course,   
    beforeEnter: authAdmin,
  },  
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: authAdmin
  },
  {
    path: '/settings',
    name: 'EventSettings',
    component: Settings,
    beforeEnter: authAdmin
  },

  // Advisor routes
  {
    path: '/submissions',
    name: 'Submissions',
    component: Submissions,
    beforeEnter: authBasic
  },
  {
    path: '/mycourses',
    name: 'MyCourses',
    component: MyCourses,
    beforeEnter: authAdvisor
  },
  
  // Author routes
  {
    path: '/submit/:articleid?',
    name: 'Submit',
    component: Submit,
    beforeEnter: authBasic
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    beforeEnter: authAuthor
  },
  {
    path: '/corrections',
    name: 'Corrections',
    component: Corrections,
    beforeEnter: authAuthor
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,   
    beforeEnter: authBasic,
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
