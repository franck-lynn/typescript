<script setup lang="ts">
import { MaybeRef } from "@vueuse/core"
import { nanoid } from "nanoId"
import { computed, provide } from "vue"

import { items } from "../helpers/sideup-data"
import { IMenu } from "../helpers/sideup-types"

const props = withDefaults(
  defineProps<{
    isNarrow: MaybeRef<boolean>
    deep?: number
    linkComponentName?: string
  }>(),
  {
    deep: 1,
    linkComponentName: "",
  }
)

const computedMenu = computed(() => {
  function transformItem(items: IMenu[]) {
    return items.map((item) => {
      return { id: nanoid(4), ...item, ...(item.children && { child: transformItem(item.children) }) }
    })
  }
  return transformItem(items)
})

provide<MaybeRef<string>>("linkComponentName", props.linkComponentName)
</script>
<template>
  <div ref="vsmRef" class="v-sidebar-menu">
    <slot name="header" />

    <sideup-scroll :is-narrow="isNarrow">
      <sideup-item v-for="item in computedMenu" :key="item.id" :item="item" :is-narrow="isNarrow">
        <slot name="dropdown-icon" v-bind="{}">
          <span class="vsm--arrow_default" />
        </slot>
      </sideup-item>
    </sideup-scroll>

    <slot name="footer" />
  </div>
</template>

<style scoped>
.v-sidebar-menu {
  display: flex; /* 需要设置才能出来滚动条 */
  width: 100%;
  height: 90%;
}
</style>
