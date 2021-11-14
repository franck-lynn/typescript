<template>
    <ul :class="['pulldown-menu', isDeepOne ? 'nav-list' : 'sub-list']">
        <li
            v-for="(item, index) in items"
            :key="index"
            :class="[
                isDeepOne ? 'nav-items' : 'sub-items',
                {list__active: isDeepOne ? currentNode === item.title : false},
                `list__level-${deep}`
            ]"
            @click="handleClick($event, item.title)"
        >
            <component
                :is="item.children || !item.href ? 'span' : 'router-link'"
                :class="[isDeepOne ? 'deep-one-title' : 'sub-link', item.children ? 'has-children-title' : 'comp-link']"
                :to="item.href"
                :title="item.title"
            >
                <span :class="`level-title-${deep}`">{{ item.title }}</span>
            </component>

            <pulldown-items v-if="item.children" :items="item.children" :deep="deep + 1" />
        </li>
    </ul>
</template>

<script lang="ts">
import {IChild} from "typings"
import {findParentNode} from "./find-ParentNode"
import {defineComponent, computed, PropType, onMounted, onUnmounted, ref} from "vue"
export default defineComponent({
    name: "pulldown-items",
    props: {
        deep: {type: Number, default: 1},
        items: {type: Array as PropType<IChild>}
    },
    setup(props) {
        const isDeepOne = computed(() => {
            return props.deep && props.deep === 1
        })
        const currentNode = ref()
        const handleClick = (e: Event, itemTitle: string) => {
            // 判断是不是第1级
            const deepMatch = (e.target as HTMLElement).className.match(/\d+/g)
            const clickedDeep = deepMatch ? parseInt(deepMatch["0"]) : null
            if (clickedDeep === 1) {
                if (currentNode.value) {
                    currentNode.value = null
                } else {
                    currentNode.value = itemTitle
                }
            }
            const el = findParentNode(e.target as HTMLElement, "nav-items")
            const rootInnerHTML = el.querySelector(".level-title-1").innerHTML
            if (currentNode.value === rootInnerHTML) {
                const currTag = findParentNode(e.target as HTMLElement, "comp-link")
                if (currTag) {
                    currentNode.value = null
                }
            } else {
                if (clickedDeep !== 1) {
                    currentNode.value = itemTitle
                }
            }
        }
        const cancelMenu = (e) => {
            const el = findParentNode(e.target, "pulldown-menu")
            if (!el || !el.className || !el.className.includes("pulldown-menu")) {
                currentNode.value = null
            }
        }

        // 监听页面上的点击事件
        onMounted(() => {
            document.addEventListener("click", cancelMenu)
        })
        // 无论如何, 只要卸载了这个组件, 都要移除该组件的响应事件
        onUnmounted(() => document.removeEventListener("click", cancelMenu))

        return {isDeepOne, currentNode, handleClick}
    }
})
</script>

<style lang="scss" scoped>
$color-text: #fff;
$color-level-1: #65cea7;
$font-size-level-1: 16px; // 一级菜单的字体大小
$color-separator-line: #aaa9a9;
$height-pulldown-list: 45px; // 图标, 链接, 标题的框高度
$height-pulldown-items: 36px;
$width-level-1: 165px;
$width-offset-right-level-1: 45px; // 一级菜单绝对定位时向右偏移的距离
$width-little-triangle: 5px;
$offset-left-little-triangle: 10px;
$color-sub-list: #353f4f;
$margin-left-title: 10px;

a {
    text-decoration: none;
}

.deep-one-title,
.sub-link {
    cursor: pointer;
}

.nav-list {
    position: relative; // 整个的 ul
    display: inline-flex;

    .nav-items {
        // ul下的li, 各级的li
        display: flex; // 各级的li, N + 1 级部分覆盖
        background-color: #7a78f0; // 一级菜单背景色
        height: $height-pulldown-list; // 菜单高度
        margin-left: $margin-left-title;
        align-items: center;

        &:hover {
            // 各级li, 实际一级li, N + 1 级有覆盖
            background-color: $color-sub-list;
            // background-color: red;
        }

        .deep-one-title {
            color: #fff; // li 下的 component, 可能是span或者a
            margin: 0 8px; // 一级菜单外边距
            font-size: 16px; // 一级菜单字体, 水平的那一栏
            // font-weight: normal;
        }

        .sub-list {
            .sub-items {
                display: none;
            }
        }

        &.list__active {
            // 与 nav-items 是同一级
            > .sub-list {
                top: $height-pulldown-list; // 解决了二级菜单以后高度不平齐问题, 高度不平齐选取3级不容易选中
            }
            .sub-list {
                position: absolute; // 二级菜单整体部分, 设置宽度和定位位置, 高度会自适应
                width: $width-level-1; // 下拉菜单宽度
                // top: $height-pulldown-items; // 36px 二级菜单相对于一级菜单高度
                // top: 36px;
                // top: $height-pulldown-list;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 3px 3px 6px hsla(0, 6%, 10%, 0.302);
                z-index: 9999;
                
 
                
                
                // 设置伪类样式
                > .sub-items {
                    display: flex;
                    // background-color: #ee9282;
                    height: $height-pulldown-items; // 36px 二级菜单相对于一级菜单高度

                    .sub-link,
                    .deep-one-title {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        // margin-left: $margin-left-title;
                        margin: auto $margin-left-title;
                        font-size: 14px; // 二级菜单的字体大小
                       
                    }

                    //! 非常重要的设置
                    > .sub-list {
                        display: none;
                    }

                    &:hover {
                        background-color: $color-level-1; // N + 1 级菜单背景色

                        > .sub-list {
                            position: absolute;
                            display: block;
                            left: $width-level-1; // 设置与菜单的宽度相同
                            // 设置伪类
                        }
                    }
                }
            }
        }
    }
}
</style>
