/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HospitalView from "../views/HospitalView.vue";
import DoctorView from "../views/DoctorView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import SchedulingView from '../views/SchedulingView.vue'
import AdminHomeView from '../views/AdminHomeView.vue'
import DoctorHomeView from "@/views/DoctorHomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/error',
      name: 'ErrorView',
      component: ErrorView,
      meta: { requiresAuth: false }
    },
    {
      path: '/loginview',
      name: 'LoginView',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/registerview',
      name: 'RegisterView',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/hospital/:id',
      name: 'HospitalView',
      component: HospitalView,
      meta: { requiresAuth: false, requiredRoles: ['patient', 'doctor', 'admin'] }
    },
    {
      path: '/doctor/:doctorname',
      name: 'DoctorView',
      component: DoctorView,
      meta: { requiresAuth: false, requiredRoles: ['patient', 'doctor', 'admin'] }
    },
    {
      path: '/user',
      name: 'UserHomeView',
      component: UserHomeView,
      meta: { requiresAuth: false, requiredRoles: ['patient'] }
    },
    {
      path: '/doctorHome',
      name: 'DoctorHomeView',
      component: DoctorHomeView,
      meta: { requiresAuth: false, requiredRoles: ['doctor'] }
    },
    {
      path: '/scheduling/:doctorname',
      name: 'SchedulingView',
      component: SchedulingView,
      meta: { requiresAuth: false, requiredRoles: ['doctor'] }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHomeView,
      meta: { requiresAuth: false, requiredRoles: ['admin'] }
    }
  ]
})

export default router


// 调试时请注释掉以下代码

router.beforeEach((to, from, next) => {
  // 检查是否需要登录权限
  if (to.meta.requiresAuth) {
    // 这里可以根据你的实际情况判断用户是否登录
    const role = store.state.role

    if (role === "unAuthenticated") {
      // 未登录，跳转到登录页
      next('/loginview');
    } else {
      // 已登录，检查是否有其他权限要求
      const requiredRoles = to.meta.requiredRoles;

      if (requiredRoles && requiredRoles.length > 0) {
        if (!requiredRoles.includes(role)) {
          // 用户角色不满足要求，跳转到首页或其他页面
          next('/error');
        } else {
          // 用户角色满足要求，继续正常跳转
          next();
        }
      } else {
        // 不需要其他权限，继续正常跳转
        next();
      }
    }
  } else {
    // 不需要登录权限，直接继续跳转
    next();
  }
});
