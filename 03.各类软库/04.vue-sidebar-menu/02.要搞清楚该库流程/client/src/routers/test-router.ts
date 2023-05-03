import { basename } from "@/utils/basename"
import { RouteRecordRaw } from "vue-router"

const files = import.meta.glob("../books/**/*.vue")

const routes: Array<RouteRecordRaw> = []
for (const file in files) {
  /* 获取的是相对路径的文件名, 带扩展名 */
  // ../books/test-sidebar-menu/basic-usage.vue
  // const filename = (isIncludeIndex(file) ? parentFolder(file) : basename(file, ".vue")) as string
  // ! "^.{1,2}" 以.或..开头,
  // ! "(/[\\w\\d-]+){2}"  以 / 开头, 字母, 数字, - 一个或多个, 重复 2次
  const regex = new RegExp("^.{1,2}/" + "([\\w\\d-]+/){2}" + "(?<fd>(.+))" + "\\.[\\w\\d]+$")
  const matched = file.match(regex)
  const filename = matched?.groups?.["fd"]
  // console.log("01. 获取的文件带路径转 url ----> ", encodeURI(filename!))
  // console.log("02. name ----> ", "test-" + basename(filename!))
  // console.log("03. 导入的文件---> " + files[file])
  if (filename) {
    routes.push({
      path: encodeURI(filename) /* 子路由中不需要 / */,
      name: "test-" + basename(filename), // 英文的文件名
      component: files[file],
    } as RouteRecordRaw)
  }
}

export default routes
