<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <c2-horizontal-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>
      <div class="sidebar-menus">
        <sidebar />
      </div>
    </template>
  </c2-horizontal-movable>
</template>

<style scoped>
.sidebar-menus {
  width: 100%;
  border: 1px solid red;
}
</style>
