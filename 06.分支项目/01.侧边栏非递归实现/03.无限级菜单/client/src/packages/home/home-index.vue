<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <c2-horizontal-movable>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>

      <!-- <div class="sidebar-menus">
        <div ref="targetUp" class="up">
          <sideup :sidedata="sideupData" :is-narrow="isNarrow"></sideup>
        </div>

        <div ref="targetDown" class="down">
          <sidedown :sidedata="sidedownData" :is-narrow="isNarrow"></sidedown>
        </div> 
      </div>-->
    </template>
  </c2-horizontal-movable>
</template>

<style scoped></style>
