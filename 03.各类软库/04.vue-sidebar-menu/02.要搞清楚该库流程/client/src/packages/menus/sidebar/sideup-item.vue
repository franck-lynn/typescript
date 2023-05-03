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
    :class="['vsm--link', `vsm--link_${deep}`, { 'vsm--link_active': currentId === item.id }]"
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
}
.vsm--header_narrow {
  display: none;
}

/* 一级菜单 */
.vsm--link_1 {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--item-padding);
  width: 100%;
  font-size: var(--item-font-size);
  font-weight: 400;

  /* background-color: rgb(205 50 156); */
  transition: 0.3s all ease;
  flex: 1;

  /* line-height: var(--item-line-height); */

  /* user-select: none; */
  flex-direction: column;
}
.vsm-children {
  /* position: absolute; */
  display: flex;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  .vsm-dropdown {
    display: flex;
    flex-direction: column;
    .vsm--link {
      display: flex;
      flex-direction: column;
      
      /* width: 0; */

      /* flex: 1; */
    }
  }
}

/* .vsm-dropdown {
  width: 0;
  flex: 1;
  & > .vsm-title {
    width: 100%;
    flex: 1;
    background-color: #ffffff;
    :first-child {
      width: 100%;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: red;
    }
  }
} */
</style>
