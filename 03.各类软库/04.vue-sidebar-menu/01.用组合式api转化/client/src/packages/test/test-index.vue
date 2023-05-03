<script setup lang="ts">
import {} from "vue"

import { menu } from "./sidebar-data"
</script>
<template>
  <c2-horizontal-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>
      <div class="sidebar-menus">
        <sidebar :menu="menu" />
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
.sidebar-menus {
  width: 100%;
  border: 1px solid red;
}
</style>
