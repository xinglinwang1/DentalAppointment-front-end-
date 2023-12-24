//import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HospitalView from "../views/HospitalView.vue";
import DoctorView from "../views/DoctorView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import SchedulingView from '../views/SchedulingView.vue'
import AdminHomeView from '../views/AdminHomeView.vue'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/loginview',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/hospital/:id',
      name: 'HospitalView',
      component: HospitalView,
    },
    {
      path: '/doctor/:doctorname',
      name: 'DoctorView',
      component: DoctorView,
    },
    {
      path: '/user',
      name: 'UserHomeView',
      component: UserHomeView,
    },
    {
      path: '/scheduling/:doctorname',
      name: 'SchedulingView',
      component: SchedulingView,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHomeView,
    }
  ]
})

export default router