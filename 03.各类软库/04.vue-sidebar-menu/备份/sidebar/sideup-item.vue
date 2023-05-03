<script setup lang="ts">
import { computed, inject, ref } from "vue"
import { MaybeRef } from "@vueuse/core"

import SideupLink from "./sideup-link.vue"
import { IMenu } from "../helpers/sideup-types"

const props = withDefaults(
  defineProps<{
    item: IMenu
    isNarrow: MaybeRef<boolean>
    deep?: number
  }>(),
  {
    deep: 1,
  }
)

const isDeepOne = computed(() => props.deep && props.deep === 1)
const isHidden = computed(() => props.item.isHidden)

const currentId = ref<string>()
const isOpen = ref(false) /* 控制下级菜单是否打开 */

const linkComponentName = inject<MaybeRef<string>>("linkComponentName")
/*
 item.header 是菜单中文字部分, 没有链接
 */
function handleClick(e: MouseEvent, item: IMenu, deep: number) {
  console.log("sideup-item 文件中---> ", e, item, deep)
  // console.log("sideup-item 文件中---> ", item.children)
  if (item.children && item.children.length !== 0) {
    console.log("有下级菜单的---> ")
    isOpen.value = !isOpen.value
  }
}
/**
 * 1. 标题部分有 2 种状态, 宽(显示)和窄(隐藏)
 */
</script>

<template>
  <li
    v-if="item.header && !isHidden"
    :class="['vsm--header', { 'vsm--header_narrow': isNarrow }, item.clazz]"
    v-bind="item.attributes"
  >
    {{ item.header }}
  </li>
  <li
    v-else-if="!isHidden"
    :class="[
      'vsm--link',
      `vsm--link_${deep}`,
      [isNarrow ? `vsm--link__narrow vsm--link_${deep}__narrow` : ''],
      { 'vsm--link_active': currentId === item.id },
    ]"
    @click.stop="handleClick($event, item, deep)"
  >
    <component
      :is="linkComponentName ? linkComponentName : SideupLink"
      :item="item"
      :is-deep-one="isDeepOne"
      :deep="deep"
      :is-open="isOpen"
      :is-narrow="isNarrow"
    />

    <template v-if="item.children">
      <div v-if="isOpen" class="vsm-children">
        <ul class="vsm-dropdown">
          <sideup-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :item="subItem"
            :deep="deep + 1"
            :is-narrow="isNarrow"
          >
            <template #dropdown-icons="{ isOpen }">
              <slot name="dropdown-icon" v-bind="{ isOpen }"></slot>
            </template>
          </sideup-item>
        </ul>
      </div>
    </template>
  </li>
</template>

<style scoped>
:root {
  --item-font-size: 16px;
  --item-line-height: 30px;
  --item-padding: 10px 15px;
}

/* 标题部分的2种状态(宽显示, 窄隐藏) */
.vsm--header {
  display: flex;
  padding: 10px 15px;
  width: 0;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #ffffff;
  color: #ed0bb1;
  text-transform: uppercase;
  flex: 1; /* 设置width: 0 和 flex:1 可以避免容器被撑开  */
  user-select: none;
}
.vsm--header_narrow {
  display: none;
}

/* 一级菜单与标题是平级的, 有2种状态, (宽显示, 窄隐藏)  */
.vsm--link_1 {
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 0; /* 设置 padding 有利于选择, TODO: 变量没起作用 */
  width: 100%;
  font-size: 18px; /* TODO: 变量没起作用 */
  font-weight: 400;
  transition: 0.3s all ease;
  flex: 1;
  user-select: none;
  flex-direction: column;

  /* 子级菜单 */
  .vsm-children {
    display: flex;
    width: 100%; /* 子级菜单的高度值不应该在这里设置, 这里是整个子菜单的 div 盒子 */
    background-color: #ffffff; /* 子级菜单的颜色可以单独设置 */
    flex-direction: column;
  }
}
.vsm--link_1__narrow {
  .vsm-children {
    /* position: sticky; */
    position: absolute;
    top: 100%;
    left: 120px;
    min-width: 100%;
  }
}
</style>
