import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import testRoutes from "./test-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index", // 刚开始进入时的页面
    name: "level1-index",
    component: () => import("@/packages/about/index.vue"),
    meta: { title: "首面" },
  },
  {
    path: "/login", // 登录页面, 不需要权限
    name: "level1-login",
    component: () => import("@/packages/login/login.vue"),
    meta: { title: "登录页面" },
  },
  {
    path: "/register", // 注册页面, 不需要权限
    name: "level1-register",
    component: () => import("@/packages/register/register.vue"),
    meta: { title: "注册页面" },
  },
  {
    path: "/read-more", // 注册页面, 不需要权限
    name: "level1-read-more",
    component: () => import("@/packages/register/read-more.vue"),
    meta: { title: "注册页面" },
  },
  {
    path: "/forgot-password", // 忘记密码页面, 不需要权限
    name: "level1-forgot-password",
    component: () => import("@/packages/forgot/forgot-password.vue"),
    meta: { title: "密码重置页面" },
  },
  {
    path: "/home",
    name: "level1-home",
    component: () => import("@/packages/home/home-index.vue"),
    meta: { title: "主页" },
  },
  {
    path: "/test",
    name: "level1-test",
    component: () => import("@/packages/test/test-index.vue"),
    meta: { title: "测试路由主页面" },
    children: testRoutes,
  },
]

const defaultRoute = {
  path: "/",
  name: "level1-index-default",
  component: () => import("@/packages/about/index.vue"),
  meta: { title: "首面" },
}

routes.push(defaultRoute)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
