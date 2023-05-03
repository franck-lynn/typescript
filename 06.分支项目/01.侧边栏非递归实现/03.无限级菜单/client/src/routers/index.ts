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
    // children: [
    //   {
    //     path: "basic-usage",
    //     name: "level2-test-basic-usage",
    //     component: () => import("@/books/test-sidebar-menu/basic-usage.vue"),
    //   },
    //   {
    //     path: "props",
    //     name: "level2-test-props",
    //     component: () => import("@/books/test-sidebar-menu/props.vue"),
    //   },
    //   {
    //     path: "events",
    //     name: "level2-test-events",
    //     component: () => import("@/books/test-sidebar-menu/events.vue"),
    //   },
    //   {
    //     path: "styling",
    //     name: "level2-test-styling",
    //     component: () => import("@/books/test-sidebar-menu/styling.vue"),
    //   },
    //   {
    //     path: "disabled",
    //     name: "level2-test-disabled",
    //     component: () => import("@/books/test-sidebar-menu/disabled.vue"),
    //   },
    //   {
    //     path: "page",
    //     name: "level2-test-page",
    //     component: () => import("@/books/test-sidebar-menu/page.vue"),
    //   },
    //   {
    //     path: "page/sub-page-1",
    //     name: "level2-test-page1",
    //     component: () => import("@/books/test-sidebar-menu/page/sub-page-1.vue"),
    //   },
    //   {
    //     path: "page/sub-page-2",
    //     name: "level2-test-page2",
    //     component: () => import("@/books/test-sidebar-menu/page/sub-page-2.vue"),
    //   },
    // ],
  },
]
/* 
const defaultRoute = {
  path: "/",
  name: "level1-index-default",
  component: () => import("@/packages/about/index.vue"),
  // ! vue默认重定向导致最大堆栈错误
  // ! https://cloud.tencent.com/developer/ask/sof/624535
  // redirect: "/", // 利用 redirect 设置默认进入的主页 路由
  meta: { title: "首面" },
  // 这里设置子路由, 在 app-layout.vue 中设置连接
}
 */
const defaultRoute = {
  path: "/",
  name: "level1-index-default",
  component: () => import("@/packages/test/test-index.vue"),
  // ! vue默认重定向导致最大堆栈错误
  // ! https://cloud.tencent.com/developer/ask/sof/624535
  // redirect: "/", // 利用 redirect 设置默认进入的主页 路由
  meta: { title: "首面" },
  // 这里设置子路由, 在 app-layout.vue 中设置连接
}

routes.push(defaultRoute)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
