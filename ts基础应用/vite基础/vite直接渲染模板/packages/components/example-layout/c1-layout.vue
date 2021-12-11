<template>
    <div class="c1-layout">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
        <div>E</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "c1-layout",
    props: {},
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
// * {
//    user-select: none; 
// }
.c1-layout {
    background-color: #2298a0;
    flex-flow: column nowrap;
    justify-content: center; // 主轴上居中, 主轴是 y 轴
    align-items: center; // 垂直居中
    width: 300px;
    border: 1px solid pink;
    > * {
        height: 38px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgb(34, 14, 214);
        
        &:first-child {
            background-color: #eb1717;
        }
        &:last-child {
            background-color: #28d353;
            border-bottom: none;
        }
        
        &:hover {
            // hover 放置顺序对样式是有影响的
            background-color: #fff;
            cursor: pointer;
        }
    }
}
</style>
