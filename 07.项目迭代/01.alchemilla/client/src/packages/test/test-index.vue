<script setup lang="ts">
// import Side from "../menus/sidebar/side"
</script>
<template>
  <c2-x-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>

      <div class="sidebar-menus">
        <div ref="targetUp" class="up">
          <side-index />
        </div>
      </div>
    </template>

    <template #c2-resizeable-right>
      <main-container-layout>
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
