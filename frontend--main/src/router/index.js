import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import UpdateDetails from '@/views/UpdateDetails.vue'
import CreateInterviewFormat from '@/views/createinterviewformat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/create',
    name:'createnewformat',
    component: CreateInterviewFormat
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    name: "DashboardPage",
    component: DashboardPage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/updatedetails/:id',
    name: 'UpdateDetails',
    component: UpdateDetails,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name:"NotFound",
    component: ErrorPage
  }
];

const router = new VueRouter({
  routes,
  mode:'history',
})

export default router
