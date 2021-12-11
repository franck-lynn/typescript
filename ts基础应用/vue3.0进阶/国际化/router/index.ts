import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = []

routes.push({
    path: '/', 
    name: 'index', 
    component: () => import('../components/home.vue')
})

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
