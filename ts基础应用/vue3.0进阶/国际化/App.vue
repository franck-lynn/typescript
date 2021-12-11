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
