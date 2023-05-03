<script setup lang="ts">
import { sideupData, sidedownData, topleftData } from "../../stores/data"
</script>
<template>
  <c2-x-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>

      <div class="sidebar-menus">
        <sideup :items="sideupData" :has-scroll="!isNarrow" />
        <sidedown :items="sidedownData"></sidedown>
      </div>
    </template>

    <template #c2-resizeable-right>
      <main-container-layout>
        <template #top-nav>
          <div class="flex justify-between">
            <topleft :items="topleftData"></topleft>
            <topright></topright>
          </div>
        </template>
        <template #main-container>
          <router-view></router-view>
        </template>
      </main-container-layout>
    </template>
  </c2-x-movable>
</template>

<style scoped>
.sidebar-menus {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
