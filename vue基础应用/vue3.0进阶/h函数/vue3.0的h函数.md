# vue3.0 的 h 函数

1, 在 vite 的简易模板环境下执行

```sh
> h函数 
│   App.vue // 入口 vue 文件, 这里使用 h 函数, 建立一个 RouterView 对象
│   index.html
│   main.ts
│   package.json
│   tsconfig.json
│   vite.config.ts
│   vue3.0的h函数.md
│
├───components
│       home.vue
│
├───router
│       index.ts
│
└───typings
        json.d.ts
        vue-shim.d.ts
        vue-test-utils.d.ts
```

RouterView对象 和 <router-view></router-view> 作用是一样的, 都是提供了一个路由出口.

2, 在 App.vue 里使用 h() 函数, h() 函数是 createElement()的别名

```vue
<script lang="ts">
import {RouterView} from "vue-router"
import {defineComponent, h /*computed,  watch, getCurrentInstance, onMounted */} from "vue"
export default defineComponent({
    name: "App",
    props: {},
    setup() {
        return {}
    },
    // 渲染函数, App.vue 是挂载在 index.html 的 #root id 下的
    // render(){
    //     // 生成一个 class = container 的div, 挂载在 id=root 的 div 下面
    //     return h('div', {class: 'container'})
    // }
    // 也可以采用箭头函数的写法
    // render: _ => h('div', {class: 'container', innerHTML: "设置div里的内容"})
    // render: _ => h('div', {class: 'container'}, [
    //     // 这些都是子节点
    //     '写上一些文字',
    //     // 平行的
    //     [h('h1', '一条信息'), h('h2', '另外一条信息')]
    // ])
    //! 相当于设置了一个路由出口
    render: () =>
        h("div", {
            class: "container"
        }, [
            h('span', ['这里会有路由出口']), 
            // 路由将会使用这个出口, 如果没有路由, 将会报错
            h(RouterView)
        ])
})
</script>

```

3, 生成 RouterView 需要有路由, 不然会报错

4, 设置路由, 新建 /router/index.ts 文件, 设置路由. 当访问在根目录时, 访问的

   路由是 home.vue 文件, 路由在 router-view 出口出来了

```ts
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
```

