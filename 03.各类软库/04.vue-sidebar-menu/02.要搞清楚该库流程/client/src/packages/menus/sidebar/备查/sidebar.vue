<script setup lang="ts">
import { ref } from "vue"

import { IMenu } from "./helpers"

defineProps<{
  menu: IMenu
}>()

const collapsed = ref<boolean>(false)

const selectedTheme = ref("")

const onToggleCollapse = (collapsed: boolean) => {
  console.log("onToggleCollapse ---> " + collapsed)
}

const onItemClick = (e: MouseEvent, item: IMenu) => {
  console.log("onItemClick, 在 sidebar.vue 文件中打印的  ---> ", e, item)
  // console.log(event)
  // console.log(item)
}
</script>
<template>
  <sidebarup
    v-model:collapsed="collapsed"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />
</template>

<style></style>
