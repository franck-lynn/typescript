<script lang="ts">
import {RouterView} from "vue-router"
import {defineComponent, h /*computed,  watch, getCurrentInstance, onMounted */} from "vue"
export default defineComponent({
    name: "App",
    props: {},
    setup() {
        return {}
    },
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
