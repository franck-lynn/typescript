<script setup lang="ts">
import { nanoid } from "nanoId"
import { watch, onMounted, onUnmounted, computed } from "vue"
import { Menu } from "../types"

import { initSidebar } from "../helpers/useSidebar"

const props = withDefaults(
  defineProps<{
    menu: Menu[]
    collapsed?: boolean
    showChild?: boolean
    theme?: string
    showOneChild?: boolean
    rtl?: boolean
    relative?: boolean
    disableHover?: false
    linkComponentName?: string
    width?: string
    widthCollapsed?: string
  }>(),
  {
    collapsed: false,
    showChild: false,
    showOneChild: false,
    theme: "",
    rtl: false,
    relative: false,
    disableHover: false,
    linkComponentName: "",
    width: "290px",
    widthCollapsed: "65px",
  }
)

/* 向调用 SidebarMenu.vue 的父组件发送信息 */
const emits = defineEmits<{
  /* 在 useSidebar 中也 provide 了 */
  (e: "item-click", event: MouseEvent, item: Menu): boolean
  /* 在 useSidebar 中没有 provide, 向上提供一个响应式数据? */
  (e: "update:collapsed", collapsed: string): boolean
}>()

const {
  getSidebarRef: sidebarMenuRef /* 或者整个组件根节点 */,
  getIsCollapsed: isCollapsed /* 是否折叠? 模板中使用 */,
  updateIsCollapsed /* watch */,
  unsetMobileItem /* watch */,
  updateCurrentRoute /* 监听 hasChange 路由改变 */,
} = initSidebar(props, emits)

/* 把数据进行加工一下, 添加上 id 属性 */
const computedMenu = computed(() => {
  function transformItem(items: Menu[]) {
    return items.map((item) => {
      return { id: nanoid(4), ...item, ...(item.child && { child: transformItem(item.child) }) }
    })
  }
  return transformItem(props.menu)
})

const sidebarClass = computed(() => {
  return [
    !isCollapsed.value ? "vsm_expanded" : "vsm_collapsed" /* 如果不是折叠就 expanded 展开类, 是由属性传递的 */,
    props.theme ? `vsm_${props.theme}` : "",
    props.rtl ? "vsm_rtl" : "",
    props.relative ? "vsm_relative" : "",
  ]
})

watch(
  () => props.collapsed,
  (currentCollapsed) => {
    unsetMobileItem()
    updateIsCollapsed(currentCollapsed)
  }
)

onMounted(() => {
  /* 路由切换时的监听 */
  window.addEventListener("hashchange", updateCurrentRoute)
})
onUnmounted(() => {
  window.removeEventListener("hashchange", updateCurrentRoute)
})
</script>

<template>
  <div ref="sidebarMenuRef" class="v-sidebar-menu" :class="sidebarClass">
    <slot name="header" />
    <sidebar-menu-scroll>
      <ul class="vsm--menu">
        <sidebar-menu-item v-for="item in computedMenu" :key="item.id" :item="item">
          <template #dropdown-icons="{ isOpen }">
            <slot name="dropdown-icon" v-bind="{ isOpen }">
              <span class="vsm--arrow_default" />
            </slot>
          </template>
        </sidebar-menu-item>
      </ul>
    </sidebar-menu-scroll>
    <slot name="footer" />
  </div>
</template>

<style>
@import url("../css/vue-sidebar-menu.css");
</style>
