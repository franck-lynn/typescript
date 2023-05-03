<script setup lang="ts">
import { ref } from "vue"

import { Menu } from "./types"

// import { menu } from "./sidebar"

defineProps<{
  menu: Menu
}>()

// import "vue-sidebar-menu/dist/vue-sidebar-menu.css"

/* 
import { Menu } from "./helpers/types"
const itemClick = (e: PointerEvent, item: Menu) => {
  console.log(e, item)
}
<sidebar-menu :menu="menu" @item-click="itemClick" />
*/
const collapsed = ref<boolean>(false)

// const isOnMobile = ref(false)
// const themes = ref([
//   { name: "Default theme", input: "" },
//   { name: "White theme", input: "white-theme" },
// ])

// const selectedTheme = ref("white-theme")
const selectedTheme = ref("")

const onToggleCollapse = (collapsed: boolean) => {
  console.log("onToggleCollapse ---> " + collapsed)
}

const onItemClick = (e: MouseEvent, item: Menu) => {
  console.log("onItemClick, 在 sidebar.vue 文件中打印的  ---> ", e, item)
  // console.log(event)
  // console.log(item)
}
</script>
<template>
  <sidebar-menu
    v-model:collapsed="collapsed"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />
</template>

<style></style>
