// import type {Component } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

// interface FileType {
//     [key: string]: Component
// }
// https://cn.vitejs.dev/guide/features.html#webassembly
// 读取 components 目录及其子目录下所有的 .vue 文件
// 类型参照 \ts语言基础\类型\一般类型\泛型\泛型笔记\03.泛型约束.md
// : Record<string, () => Promise<{ [key: string]: any;}>>

const files = import.meta.glob("../components/**/*.vue")

let routes: Array<RouteRecordRaw> = []

Object.keys(files).forEach((file) => {
    // 判断文件路径是否包含 defaultRoute
    // 这个正则是不包含 default-route
    if (file.match(/^(?!.*(default-route))/)) {
        // console.log("文件的路径 ---> ", file)
        const filename = file.replace(/(.*\/)*([^.]+).*/ig,"$2")
        // console.log("正则获取文件名不带后缀---> ", filename)
        routes = routes.concat({
            path: '/' + filename, 
            name: filename, 
            // 这里加上 /*@vite-ignore */ 是为了消除 rollup 的 import() 函数使用变量时的警告
            // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
            component: ()=> import(/*@vite-ignore */file)
        })
    }

    // const module = files[key]?.default
    // console.log(module.name)
    // console.log("key---> ", key)
    // const fileName = key.replace(/^(\..\/)*(components\/w*)/, "")
    // console.log("fileName---> ", fileName)
})

const defaultRoute: RouteRecordRaw = {
    // 这个是默认的路由, 也是在路由出口使用的, 当在根 / 下的时候,
    // 显示这个路由
    path: "/",
    component: () => import("@/components/default-route/index.vue"),
    meta: { title: "首面" },
}

routes.push(defaultRoute)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
