import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import HelloRoute from '@/components/hello-route/hello-route.vue'


let routes: Array <RouteRecordRaw> = []

const defaultRoute: RouteRecordRaw = {
    // 这个是默认的路由, 也是在路由出口使用的, 当在根 / 下的时候, 
    // 显示这个路由
    path: '/',
    component: () => import('@/components/default-route/index.vue'),
    meta: { title: '首面' },
}

routes.push(defaultRoute)

const r1: RouteRecordRaw = {
    path: "/hello-route", 
    name: 'helloRoute',
    component: HelloRoute
}

routes.push(r1)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router