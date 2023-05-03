import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index", // 刚开始进入时的页面
    name: "level1-index",
    component: () => import("@/packages/about/index.vue"),
    meta: { title: "首面" },
  },
]

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

routes.push(defaultRoute)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
