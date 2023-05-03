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
    :class="['vsm--title-link', `vsm--title-link-${deep}`, { 'vsm--title-link_narrow': isNarrow }]"
  >
    <sideup-icon v-if="item.icon" :icon="item.icon" :is-deep-one="isDeepOne" :deep="deep" />

    <div :class="['vsm--title', { 'vsm--title_narrow': isNarrow }, { 'only-title': !item.icon }]">
      <span>{{ item.title }}</span>

      <span v-if="item.children" class="vsm-arrow" :class="{ 'vsm--arrow_open': isOpen }">
        <slot name="dropdown-icon" v-bind="{ isOpen: isOpen }" />
      </span>
    </div>
  </component>
</template>

<style scoped>
/* 
  一, 子 级菜单的公共设置部分, 主要设置的是子菜单, 一级菜单不同的部分在下面设置, 
  根据优先级的不同进行覆盖 
*/

/* 包含图标, 文字, 三角箭头 3 个部分 */
.vsm--title-link {
  display: flex;
  align-items: center;
  padding-left: 10px; /* 有图标时整个偏移, 一级菜单的 padding-left 要覆盖这个设置 */
  height: 54px; /* 这里的高度仅对子级菜单有影响? */
  flex: 1;
  .vsm--title {
    display: flex;
    width: 0;
    flex: 1;
    :first-child {
      /* 子菜单的标题 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(0 72 255);
      flex: 1;
    }
    :last-child {
      margin-right: 8px; /* 三角符号的位置 */
    }
  }
  .only-title {
    padding-left: 10px; /* 没有图标时仅文字便宜 */
  }
}
.vsm--title-link-1 {
  display: flex;
  padding-left: 0;
  width: 100%;
  & > .vsm--title {
    /* 文字部分 */
    display: flex;
    align-items: center;
    padding-left: 0;
    width: 0;
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
.vsm--title-link_narrow {
  .vsm-title {
    position: absolute;
  }
}

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
