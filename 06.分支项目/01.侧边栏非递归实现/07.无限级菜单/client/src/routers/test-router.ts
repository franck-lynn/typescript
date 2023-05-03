import { basename } from "@/utils/basename"
import { RouteRecordRaw } from "vue-router"

const files = import.meta.glob("../books/**/*.vue")

const routes: Array<RouteRecordRaw> = []
for (const file in files) {
  // ! "^.{1,2}" 以.或..开头,
  // ! "(/[\\w\\d-]+){2}"  以 / 开头, 字母, 数字, - 一个或多个, 重复 2次
  const regex = new RegExp("^.{1,2}/" + "([\\w\\d-]+/){2}" + "(?<fd>(.+))" + "\\.[\\w\\d]+$")
  const matched = file.match(regex)
  const filename = matched?.groups?.["fd"]
  if (filename) {
    routes.push({
      path: encodeURI(filename) /* 子路由中不需要 / */,
      name: "test-" + basename(filename), // 英文的文件名
      component: files[file],
    } as RouteRecordRaw)
  }
}

const tempTestRoutes: Array<RouteRecordRaw> = [
  {
    path: "/test/r3-layout",
    name: "test r3-layout",
    component: () => import("../packages/layout/base-layout/r3-layout.vue"),
  },
  {
    path: "/test/c3-layout",
    name: "test c3-layout",
    component: () => import("../packages/layout/base-layout/c3-layout.vue"),
  },
]

routes.push(...tempTestRoutes)
export default routes
