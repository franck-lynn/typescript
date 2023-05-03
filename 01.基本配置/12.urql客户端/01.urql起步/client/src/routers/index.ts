import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router"

const routes: Array<RouteRecordRaw> = []

const defalutRoute: RouteRecordRaw = {
  path: "/",
  name: "level1-index-default",
  component: () => import("@/packages/about/index.vue"),
  meta: { title: "首面" },
}

routes.push(defalutRoute)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
