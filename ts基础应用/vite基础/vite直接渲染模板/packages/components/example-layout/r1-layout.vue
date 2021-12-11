<template>
    <div class="r1-layout">
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
    name: "r1-layout",
    props: {},
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
.r1-layout {
    // background-color: #2298a0;
    height: 45px;
    display: flex;
    flex-flow: row nowrap;
    // justify-content: center; // 主轴上居中, 主轴是 x 轴
    align-items: center; // 交叉轴上居中
    // >* 选择器
    // >选择一个元素的直接子元素, * 所有元素

    > * {
        flex: 1 1 auto;
        height: 100%;
        display: flex; // 里面的 div 也是flex,
        align-items: center; //  可以设置字体居中
        justify-content: center;
        margin-right: 15px;
        background-color: #17e4eb;
        border: 1px solid #5c3ec7;
        &:first-child {
            background-color: #eb1717;
        }
        &:last-child {
            background-color: #28d353;
            margin-right: 0;
        }
        &:hover {
            // hover 放置顺序对样式是有影响的
            background-color: #fff;
            cursor: pointer;
        }
    }
}
</style>
