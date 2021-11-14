// 路由文件, 与注册组件的 index.ts 不同, 
// 这个读取 vue 文件是添加到路由, 本文件交由 main.ts 使用
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {files} from '../utils'

// import { FileType  } from 'typings'
// const files: Record < string, FileType > =
//     import.meta.globEager('../components/**/*.vue')

let routes: Array <RouteRecordRaw> = []

// 命名约定: 文件名称与 vue 文件的 name 属性一样
Object.keys(files).forEach(key => {
    const module = files[key]?.default
    // console.log("key---> ", key)
    // const fileName = key.replace(/^(\..\/)*(components\/w*)/, "")
    // console.log("fileName---> ", fileName)
    routes = routes.concat({
        path: '/' + module.name,
        // path: '/' + fileName,
        name: module.name,
        component: module
    })  
})

const defaultRoute = {
    path: '/',
    component: () => import('@/components/example-layout/r1-layout.vue'),
    meta: { title: '首面' },
}
routes.push(defaultRoute)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router