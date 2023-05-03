<script setup lang="ts">
import { computed, ref, onMounted } from "vue"

import type { IMenu } from "../helpers"
import { topleftFlag, removeIsShowed, getTexteMaxLength } from "../helpers"
import { mouseEnterDirection } from "../helpers"

const props = withDefaults(
  defineProps<{
    deep?: number
    topleftData: IMenu[] // 需要父组件传入的数据
    isNarrow?: boolean
  }>(),
  {
    deep: 1,
    isNarrow: true,
  }
)

const isDeepOne = computed(() => props.deep && props.deep === 1)
const currentId = ref<string | number | undefined | null>()
const thisEl = ref<HTMLElement | null | undefined>()

const handleClick = (e: Event, item: IMenu, deep: number) => {
  if (item.children && item.children.length !== 0) {
    // 有下级菜单时, 点击一下都变为 true, 切换条件1
    topleftFlag.value = true
    // 当前id不是点击的id 时, 就设置为当前id 实现切换, 此为切换条件2
    currentId.value = currentId.value != item.id ? item.id : ""
  } else {
    // 点击的是最后一级菜单
    topleftFlag.value = false
  }
  // const el = e.currentTarget as HTMLElement
  // const clazz = `nav-item-${deep - 1}`
  // const removeClazz = `is-showed`
  // removeIsShowed(el, clazz, currentId, removeClazz)
}
const handleMouseenter = (e: MouseEvent, item: IMenu, deep: number) => {
  // if (isDeepOne.value) {
  //   currentId.value = currentId.value ? item.id : topleftFlag ? "" : item.id
  // }
  // currentId.value = item.id
  // if (isDeepOne.value) {
  //   if (mouseEnterDirection(e) === "enter-from-left" || mouseEnterDirection(e) === "enter-from-right") {
  //     const el = e.currentTarget as HTMLElement
  //     const clazz = `nav-item-${deep}`
  //     const removeClazz = `is-showed`
  //     removeIsShowed(el, clazz, currentId, removeClazz)
  //   }
  // }
}
onMounted(() => {
  // 获取菜单的元素
  const el = thisEl.value
  if (!el) return
  // 获取 el 这个绑定的元素的属性字的个数
  const num = el.getAttribute("data-length")
  if (!num) return
  // 获取 el 的计算属性
  const stattWithNavItemSpanEl = el.querySelector("span[class^='nav-item']")
  if (!stattWithNavItemSpanEl) return
  // 获取其计算属性
  const styleObj = getComputedStyle(stattWithNavItemSpanEl)
  const fontSizeTitle = styleObj.fontSize
  // 计算出字的宽度
  const width = parseInt(fontSizeTitle) * parseInt(num) + 2.5 * parseInt(fontSizeTitle) + "px"
  // 设置 绑定元素的宽度
  el.style.width = width
})

// 获取菜单字符串的字数最大值, 根据这个字数最大值设置不是第1级菜单 .sub-list 的宽度,
</script>
<template>
  <ul
    ref="thisEl"
    :class="[isDeepOne ? `nav-list` : 'sub-list', { 'is-narrow': isDeepOne && isNarrow }]"
    :data-length="getTexteMaxLength(topleftData)"
  >
    <li
      v-for="item in topleftData"
      :key="item.id"
      :class="[
        isDeepOne ? 'nav-items' : 'sub-items',
        `nav-item-${deep}`,
        { 'is-actived': isDeepOne ? currentId === item.id && topleftFlag : false },
        {
          'is-showed': item.children && currentId === item.id,
        },
      ]"
      @click.stop="handleClick($event, item, deep!)"
      @mouseenter="handleMouseenter($event, item, deep)"
    >
      <component
        :is="item.children || !item.href ? 'span' : 'router-link'"
        :to="item.href"
        :class="item.children ? `item-title  item-title-${deep}` : `item-link item-link-${deep}`"
      >
        <span
          v-if="item.icon || isDeepOne"
          :class="['iconfont', item.icon ? item.icon : isDeepOne ? 'icon-all-fill' : '', `iconfont-${deep}`]"
        ></span>
        <span :class="item.children ? `nav-item-title-${deep}` : `nav-item-link-${deep}`">
          {{ item.title }}
        </span>
      </component>
      <topleft v-if="item.children" :topleft-data="item.children" :is-narrow="isNarrow" :deep="deep! + 1"> </topleft>
    </li>
  </ul>
</template>

<style scoped>
/* @import url("scss/global.css"); */
@import url("scss/main.css");
.nav-list {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--height-top-nav);
  color: var(--font-color);
  background-color: var(--background-color-top-nav);
  user-select: none;
  flex-wrap: nowrap;
}
.nav-list .item-title-1,
.nav-list .item-link-1 {
  display: flex;
  align-items: center;
  padding-right: calc((var(--height-top-nav) - var(--font-size-top-nav)) / 2 + 2px);
  height: var(--height-top-nav-hover);
  border-radius: 4px;
  & > :first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--height-top-nav);
    height: var(--height-top-nav);
    font-size: var(--font-size-top-icon);
    color: green;
  }
  & > :last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height-top-nav);
    font-size: var(--font-size-top-nav);
  }
  &:hover {
    color: var(--color-top-nav-hover);
    background-color: var(--background-color-top-nav-hover);
    & > :first-child {
      color: cyan;
    }
  }
}

/* -------------------------- 递归部分开始 ------------------------------- */
.nav-items {
  position: relative;
}
.nav-items .sub-list {
  position: absolute;
  bottom: 0;

  /* 在根据字数计算宽度, 出现菜单之间有间隙的现象, 把这个属性去掉就好了 */

  /* left: 0; */
  display: flex;
  align-items: center;
  min-width: var(--min-width-sub-top-nav);
  max-height: 0;
  visibility: hidden;
  transform: translateY(100%);
  flex-direction: column;
  & .item-title::after {
    @mixin arrow;

    border-color: transparent var(--default) transparent transparent;
  }
  & > .sub-items {
    position: relative;
    display: flex;
    width: 100%;
    background-color: #ffffff;
    background-color: #ccc7c7;
    flex-direction: column;
    & .item-title,
    & .item-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--height-sub-top-nav);
      cursor: default;
      & :first-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: var(--height-sub-top-nav);
        height: var(--height-sub-top-nav);
        font-size: var(--font-size-sub-icon);
      }
      & :last-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 calc(var(--height-sub-top-nav) - var(--font-size-sub-icon) - 2px);
      }
      &:hover {
        color: #ffffff;
        background-color: var(--hover-color-sub-top-nav);
      }
    }
    & > .sub-list {
      position: absolute;
      top: 0;
      right: 0;
      visibility: hidden;
      transform: translateX(100%);
      flex-direction: column;
    }
  }
}
.is-actived .sub-list {
  max-height: auto;
  visibility: visible;

  /* box-shadow: 4px 4px 12px #878585; */
  & .is-showed {
    & > .item-title::after {
      transform: rotate(315deg);
    }
    & > .sub-list {
      max-height: none;
      visibility: visible;
    }
  }
}
</style>
