<script setup lang="ts">
import { MaybeRef } from "@vueuse/shared"
import { computed } from "vue"
import { IMenu } from "../helpers/sideup-types"

const props = defineProps<{
  item: IMenu
  isDeepOne?: MaybeRef<boolean>
  deep?: MaybeRef<number>
  isOpen?: MaybeRef<boolean>
  isNarrow: MaybeRef<boolean>
}>()

/* 
 如果有 href, 就是超链接, 如果没有, 就是标题部分,
 一般是指有下级菜单的情况, 上级菜单不能有超链接
*/
const isHyperLink = computed(() => props.item.href)
</script>
<template>
  <component
    :is="item.children || !isHyperLink ? 'span' : 'router-link'"
    :to="item.href"
    :class="[
      'vsm--title-link',
      `vsm--title-link-${deep}`,
      [deep! > 1 ? 'children' : ''],
      { 'vsm--title-link_narrow': isNarrow },
    ]"
  >
    <sideup-icon v-if="item.icon" :icon="item.icon" :is-deep-one="isDeepOne" :deep="deep" />

    <div :class="['vsm--title', { 'vsm--title_narrow': isNarrow }]">
      <span>{{ item.title }}</span>

      <span v-if="item.children" class="vsm-arrow" :class="{ 'vsm--arrow_open': isOpen }">
        <slot name="dropdown-icon" v-bind="{ isOpen: isOpen }" />
      </span>
    </div>
  </component>
</template>

<style scoped>
.children {
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid red;
  .vsm--title {
    display: flex;
    width: 0;
    flex: 1;
    :first-child {
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: red;
      flex: 1;
    }
  }
}
.vsm--title-link {
  display: flex;
  width: 100%;
  .vsm--title {
    position: relative;
    display: flex;

    /* align-items: center; */

    width: 100%;
    flex: 1;
  }
}
.vsm--title-link-1 {
  display: flex;
  width: 100%;
  & > .vsm--title {
    display: flex;
    align-items: center;
    width: 0;
    border: 1px solid rgb(217 83 83);
    overflow: hidden;
    flex: 1;
    :first-child {
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: red;
      flex: 1;
    }
  }
}

/* .vsm--title {
  display: flex;
  align-items: center;
  width: 0;
  font-size: 16px;
  border: 1px solid rgb(217 83 83);
  overflow: hidden;
  flex: 1;
  :first-child {
    width: 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: red;
  }
} */

/* 三角箭头 */
.vsm-arrow {
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  color: yellow;
  background-color: #a02222;
  &_default {
    position: relative;
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
    &::before {
      position: absolute;
      top: 2px;
      left: 0;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-bottom: 2px solid;
      border-left: 2px solid;
      transform: rotate(-135deg);
      content: "";
      box-sizing: content-box;
    }
  }
  &_open {
    .vsm--arrow_default {
      transform: rotate(90deg);
    }
  }
}
</style>
