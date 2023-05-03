<script setup lang="ts">
import { ref } from "vue"
import { SidebarMenu } from "vue-sidebar-menu"
import "vue-sidebar-menu/dist/vue-sidebar-menu.css"

import { items } from "./sideup-data"
const width = ref(290)
const widthCollapsed = ref(65)
</script>
<template>
  <c2-horizontal-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>
      <div class="sideup-menus">
        <SidebarMenu :menu="items" />
      </div>
    </template>

    <template #c2-resizeable-right>
      <main-container-layout>
        <template #main-container>
          <router-view></router-view>
        </template>
      </main-container-layout>
    </template>
  </c2-horizontal-movable>
</template>

<style scoped>
.sideup-menus {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
