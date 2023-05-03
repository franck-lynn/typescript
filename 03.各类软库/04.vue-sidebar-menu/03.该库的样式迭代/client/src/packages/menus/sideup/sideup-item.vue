<script setup lang="ts">
import { computed, inject, ref } from "vue"
import { MaybeRef } from "@vueuse/core"

// import SideupLink from "./sideup-link.vue"
import { IMenu } from "../helpers/sideup-types"
import { removeIsShowed, sideupFlag } from "../helpers"

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
const isHidden = computed(() => props.item.isHidden)

const linkComponentName = inject<MaybeRef<string>>("linkComponentName")

const isDeepOne = computed(() => props.deep && props.deep === 1)
const currentId = ref<string>()

const handleClick = (e: Event, item: IMenu, deep: number) => {
  if (item.children && item.children.length !== 0) {
    sideupFlag.value = true
    currentId.value = item.id
  } else {
    // 点击的是最后一级菜单
    sideupFlag.value = false
  }

  const el = e.currentTarget as HTMLElement
  const clazz = `nav-item-${deep - 1}`
  const removeClazz = `is-showed`

  removeIsShowed(el, clazz, currentId, removeClazz)
}
</script>
<template>
  <ul :class="[isDeepOne ? `nav-list` : 'sub-list', { 'is-narrow': isDeepOne && isNarrow }]">
    <li
      :key="item.id"
      :class="[
        isDeepOne ? 'nav-items' : 'sub-items',
        `nav-item-${deep}`,
        { 'is-actived': isDeepOne ? currentId === item.id && sideupFlag : false },
        {
          'is-showed': item.children && currentId === item.id,
        },
      ]"
      @click.stop="handleClick($event, item, deep!)"
    >
      <component
        :is="item.children || !item.href ? 'span' : 'router-link'"
        :to="item.href"
        :class="item.children ? `item-title  item-title-${deep}` : `item-link item-link-${deep}`"
        :style="{paddingLeft: deep === 1 ? 0: 10 + 5 * (deep! - 0) + 'px'}"
      >
        <span
          v-if="item.icon || isDeepOne"
          :data-tip="[isDeepOne && isNarrow ? item.title : null]"
          :class="['iconfont', item.icon ? item.icon : isDeepOne ? 'icon-all-fill' : '', `iconfont-${deep}`]"
        ></span>
        <span
          :class="item.children ? `nav-item-title-${deep}` : `nav-item-link-${deep}`"
          :style="{
            fontSize: 18 - deep! * 1 + 'px' 
          }"
        >
          {{ item.title }}
        </span>
      </component>
      <sideup v-if="item.children" :sidedata="item.children" :is-narrow="isNarrow" :deep="deep! + 1"> </sideup>
    </li>
  </ul>
</template>

<style scoped>
/* @import url("scss/global.css"); */
@import url("scss/main.css");

/********************** 一般状态(宽状态): 激活, 是否显示, 悬停 ****************************** */
.nav-list {
  /*
  --height-nav-list: 45px;
  --min-width-sidebar: 45px;
  --width-separator: 2px;
  --color-text: #ffffff;
  --color-level-1: #65cea7;
  --font-size-level-1: 16px;
  --color-separator-line: #aaa9a9;
  --width-level-1: 165px;
  --width-offset-right-level-1: 45px;
  --width-little-triangle: 5px;
  --offset-left-little-triangle: 10px;
  --color-sub-list: #353f4f;
  --sidebar-min-width: 45px;
*/

  position: relative;
  display: flex;
  width: 100%;

  /* height: 100%; */
  flex-direction: column;
  user-select: none;
}
.nav-items .item-title-1,
.item-link-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--min-width-sidebar);
  border-left: 2px solid transparent;
  color: var(--color-text);
  & > :first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--min-width-sidebar) - var(--width-separator)); /* 要减去分割线的宽度 */
    height: var(--min-width-sidebar);
    flex: 1 0 1;
  }
  & > :last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc((100% - var(--min-width-sidebar))); /* 减去图标宽度就是文字的宽度(例如菜单一), 指的是一级菜单 */
    height: var(--min-width-sidebar);

    /* font-size: var(--font-size-level-1); */

    /* 一级菜单的字体大小, 窄状态下是隐藏的 */
  }
  &:hover {
    border-left: 2px solid var(--sidebar-hover-color);
    color: var(--sidebar-hover-color);
    background-color: var(--sidebar-hover-background-color);
  }
}
.item-title::after {
  @mixin arrow;
}

/* -------------------------- 递归部分开始 ------------------------------- */
.sub-list {
  position: relative;
  display: flex;
  width: 100%;
  max-height: 0;
  overflow: hidden;

  /* 二级菜单2-1字体颜色, 设置不了字体大小, 在   & .item-title, & .item-link 里设置  */

  /* 激活后窄状态颜色在     & .nav-items > .sub-list {  color: red; ...} 里设置 */
  color: var(--color-text);
  background-color: var(--color-sub-list); /* 二级菜单的背景色 */
  visibility: hidden;
  transition: all 0.2s;
  flex-direction: column;
  & .sub-items {
    position: relative;
    display: flex;
    flex-direction: column;
    & .item-title,
    & .item-link {
      display: flex; /* 子菜单文本 */
      justify-content: space-between;
      align-items: center;
      height: 40px;

      /* 二级及以下字体大小, 字体在 template 做 */
      border-left: 2px solid transparent;
      &:hover {
        border-left: 2px solid cyan;
        color: cyan;
        background-color: rgb(255 255 255 / 10%);
      }
    }
    & .sub-list {
      bottom: 0;
      display: flex;
      width: 100%;
      max-height: 0;
      overflow: hidden;

      /* 二级以下菜单的字体杨泽可以在这里单独设置 */

      /* color: yellow; */
      visibility: hidden;
      flex-direction: column;
    }
  }
}
.is-actived > .item-title::after {
  transform: rotate(315deg);
}
.is-actived .sub-list {
  max-height: none;
  visibility: visible;
  & .is-showed {
    & > .item-title,
    & > .item-link {
      border-left: 2px solid transparent;
      background-color: rgb(255 255 255 / 10%);
    }
    & > .item-title::after {
      transform: rotate(315deg);
    }
    & > .sub-list {
      max-height: none;
      visibility: visible;
    }
  }
}

/* -------------------------- 递归部分结束 ------------------------------- */

/************************************************* 窄状态  ********************************************************* */
.is-narrow {
  & .nav-items .item-title-1,
  & .item-link-1 {
    & > :last-child {
      display: none;
    }
    &::after {
      display: none;
    }
  }
  & .nav-items {
    position: relative;
  }
  & .nav-items > .sub-list {
    /* 第2级菜单在窄状态下单独设置颜色可以在这里设置 */

    /* color: red; */
    &::after {
      @mixin triangle-left;
    }
  }

  /* -------------------------- 窄状态 递归部分开始 ------------------------------- */
  & .sub-list {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    min-width: 160px;
    max-height: 0;
    overflow: visible;
    visibility: hidden;
    transform: translateX(100%);
    & .sub-items {
      background-color: var(--color-sub-list);

      /* background-color: #65cea7; */
      & .sub-list {
        width: auto;
        min-width: 200px;
        max-height: none;
        overflow: visible;
        & .item-link,
        & .item-title {
          /* height: 40px; */
          height: var(--height-sub-nav);
        }
      }
    }
  }

  /* 窄状态的第1级 小三角形对准中心位置 */
  & .nav-items > .sub-list {
    top: 2.5px; /* (45-40)/2 */
  }
  & .is-actived > .sub-list {
    max-height: none;
    visibility: visible;
    & .is-showed {
      & > .sub-list {
        max-height: none;
        visibility: visible;
      }
    }
  }
}
.is-narrow .iconfont:hover {
  @mixin data-tip-up;
}
</style>
