<script setup lang="ts">
import { MaybeRef } from "@vueuse/shared"
import { computed, ref, toRefs } from "vue"

import { useSidebar } from "../helpers/useSidebar"
// import useItem from "../helpers/useItem"
import type { MenuItem } from "../types"

import SidebarMenuLink from "./SidebarMenuLink.vue"

const props = withDefaults(
  defineProps<{
    item: MenuItem
    level?: number

    isHidden: MaybeRef<boolean>
  }>(),
  { level: 1 }
)
/*
useSidebar() 注入了这2个函数
getSidebarProps: inject("vsmProps"),
  --> provide("vsmProps", props) --> 使用这个相当于把 父组件的属性调用了,
  可以继续给递归组件使用
getIsCollapsed: inject("getIsCollapsed"),  重命名为 isCollapsed
*/
const { getSidebarProps, getIsCollapsed: isCollapsed } = useSidebar()

const { linkComponentName } = toRefs(getSidebarProps!) /* 这里的 props 是父组件的 */

/* ! SidebarMenuItem 进行了一系列的监听, 分别告诉父组件或者本身进行值得修改 */
// const {
//   // active,
//   // exactActive,
//   show,
//   hover,
//   isFirstLevel,
//   isHidden,
//   hasChild,
//   linkClass,
//   linkAttrs,
//   itemClass,
//   isMobileItem,
//   mobileItemStyle,
//   mobileItemDropdownStyle,
//   mobileItemBackgroundStyle,
//   onLinkClick,
//   onMouseOver,
//   onMouseOut,
//   onMouseEnter,
//   onMouseLeave,
//   onExpandEnter,
//   onExpandAfterEnter,
//   onExpandBeforeLeave,
//   onExpandAfterLeave,
// } = useItem(props) /* 这里的 props 是本身的 */

/* 是否为一级菜单 */
const isFirstLevel = computed(() => props.level === 1)

/* 当为链接时 */
const linkClass = computed(() => {
  return [
    "vsm--link",
    `vsm--link_level-${props.level}`,
    { "vsm--link_active": active.value },
    { "vsm--link_disabled": props.item.disabled },
    { "vsm--link_open": show.value },
    props.item.class,
  ]
})
</script>

<template>
  <li v-if="item.component && !isHidden">
    <component :is="item.component" v-bind="item.props" />
  </li>
  <li v-else-if="item.header && !isHidden" class="vsm--header" :class="item.class" v-bind="item.attributes">
    {{ item.header }}
  </li>
  <li v-else-if="!isHidden" class="vsm-item">
    <component
      :is="linkComponentName ? linkComponentName : SidebarMenuLink"
      :item="item"
      :class="linkClass"
      v-bind="linkAttrs"
      @click="onLinkClick"
    >
      <template v-if="isCollapsed && isFirstLevel">
        <transition name="slide-animation">
          <div v-if="hover" class="vsm--mobile-bg" :style="mobileItemBackgroundStyle" />
        </transition>
      </template>
      <sidebar-menu-icon v-if="item.icon" :icon="item.icon" />
      <div
        class="vsm--title"
        :class="isCollapsed && isFirstLevel && !isMobileItem && 'vsm--title_hidden'"
        :style="[isMobileItem ? mobileItemStyle : {}]"
      >
        <span>{{ item.title }}</span>
        <sidebar-menu-badge v-if="item.badge" :badge="item.badge" />
        <div v-if="hasChild" class="vsm--arrow" :class="{ 'vsm--arrow_open': item.child && currentId === item.id }">
          <slot name="dropdown-icon" v-bind="{ isOpen: show }" />
        </div>
      </div>
    </component>
    <template v-if="hasChild">
      <transition
        :appear="isMobileItem"
        name="expand"
        @enter="onExpandEnter"
        @after-enter="onExpandAfterEnter"
        @before-leave="onExpandBeforeLeave"
        @after-leave="onExpandAfterLeave"
      >
        <div
          v-if="show"
          class="vsm--child"
          :class="isMobileItem && 'vsm--child_mobile'"
          :style="[isMobileItem ? mobileItemDropdownStyle : {}]"
        >
          <ul class="vsm--dropdown">
            <sidebar-menu-item v-for="subItem in item.child" :key="subItem.id" :item="subItem" :level="level + 1">
              <template #dropdown-icons="{ isOpen }">
                <slot name="dropdown-icon" v-bind="{ isOpen }" />
              </template>
            </sidebar-menu-item>
          </ul>
        </div>
      </transition>
    </template>
  </li>
</template>
