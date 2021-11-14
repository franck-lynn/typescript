<template>
    <pulldown-index :data="data" class="nav"></pulldown-index>
    <div class="root-view">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import "vite/client.d"

// import {toObjectArray} from "./packages/utils"
import {toObjectArrayCn} from "./packages/utils"
import {FileType} from "./typings"
// 测试数据
// import {data} from '@/components/pulldown/__test__/data.ts'

import {defineComponent} from "vue"
export default defineComponent({
    name: "App",
    props: {},
    setup() {
        const files: Record<string, FileType> = import.meta.globEager("./packages/components/**/*.vue")
        const reg = /^(?!.*(pulldown))/ // 这个正则是不包含 pulldown
        const filesPath = Object.keys(files)
            .filter((file) => reg.test(file))
            // 排除掉 components 前面的部分
            .map((path) => {
                const hasCname = files[path].default.cname
                path = hasCname ? path + '|' + hasCname : path
                return path.replace(/^(\.\/)*(packages\/components)/, "")
            })

        // const data = toObjectArray(filesPath)
        const data = toObjectArrayCn(filesPath)
        
        return {data}
    }
})
</script>

<style lang="scss" scope>
// @import '~/compass-mixins/lib/compass';
// scss 是配置的别名
@import "scss/scss/entries/shared"; // shared.scss 已经引入了 compass
// shared.scss 引入了 compass, 并且已经运行 @include global-reset; 这个函数, 清除所有的默认样式
$height-nav: 45px;
.nav {
    display: flex;
    width: 100%;
    height: $height-nav;
    background: #55d6aa;
    font-weight: bold;
    font-size: 24px;
    flex-wrap: wrap; // 一行排不下时自动换行
    // justify-content: center;
    align-items: center;
}
// 样式参照如下网站:
// https://codepen.io/kevinpowell/pen/GrLKNo
/* 
    nav {
        // nav 是菜单栏的顶级元素
        display: inline-flex;
        width: 100%;
        height: $height-nav;
        background: #55d6aa;
        // justify-content: center;
        align-items: center; // 交叉轴上的对齐方式: 居中对齐
        font-weight: bold;
        font-size: 24px;
        flex-wrap: wrap; // 一行排不下时自动换行

        li {
            display: inline-block; // li 元素在 nav 中是垂直居中
            margin-left: 20px;
            // padding-top: 23px;
            position: relative; // 相对于 li 自己是相对定位

            a {
                // margin: 5px;
                text-decoration: none;
                // width: 200px;
                @include link-colors(rgb(117, 96, 116), rgb(255, 0, 0), #fb0, rgb(167, 85, 52), #f00);

                // 导航菜单上的标记线, 是一个线条块
                &::before {
                    content: "";
                    display: block;
                    height: 5px;
                    background-color: #444;
                    position: absolute;
                    top: -50%; // 由于 a 没有设置宽高, 标记线定位 top: 0; 时就是在 a的上方, 会显示在中间位置, 所以要向上偏 -50%
                    width: 0%; // 刚开始时的宽度是 0
                    transition: all ease-in-out 250ms;
                }

                &:hover::before {
                    width: 100%; // 悬停的时候宽度
                }
            }
        }
    } 
*/
.root-view {
    height: calc(100% - #{$height-nav});
    background-color: #eeeaea;
    // overflow-y: hidden;
    // margin: 20px;
    padding: 20px;
}
</style>
