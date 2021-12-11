<template>
    <div>
        <pulldown-items :items=data>
        </pulldown-items>
    </div>
</template>

<script lang="ts">
// pulldown-index.vue 作为 递归组件的出口文件,
// 调用 pulldown-item.vue 这个递归组件
// App.vue 调用这个出口文件, 数据在 App.vue 文件中传入
import { IChild } from "typings"
import { defineComponent, PropType } from "vue"
export default defineComponent({
    name: "pulldown-index",
    props: {
        data: { type: Array as PropType<IChild> }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
* {
    // 在这里可以设置水平菜单不可选择
   user-select: none; 
}
</style>
