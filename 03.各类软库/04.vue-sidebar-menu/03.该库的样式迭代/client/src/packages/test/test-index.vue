<script setup lang="ts">
import { ref } from "vue"
import { onClickOutside } from "@vueuse/core"

import { sideupFlag, sidedownFlag, topleftFlag } from "../menus/helpers"
import { sideupData, sidedownData, topleftData } from "./test-data"
import { isNarrow } from "../layout/units-layout/c2-horizontal-movable/isNarrow"

const targetUp = ref<HTMLElement | null>(null)
const targetDown = ref<HTMLElement | null>(null)
const targetTopleft = ref<HTMLElement | null>(null)

onClickOutside(targetUp, () => {
  if (isNarrow.value) {
    sideupFlag.value = false
  }
})
onClickOutside(targetDown, () => (sidedownFlag.value = false))
onClickOutside(targetTopleft, () => (topleftFlag.value = false))
</script>
<template>
  <c2-resizeable-layout>
    <template #c2-resizeable-left="{ isNarrow }">
      <div class="sidebar-logo">
        <sidebar-logo :is-narrow="isNarrow" />
      </div>

      <div class="sidebar-menus">
        <div ref="targetUp" class="up">
          <sideup :sidedata="sideupData" :is-narrow="isNarrow"></sideup>
        </div>

        <div ref="targetDown" class="down">
          <sidedown :sidedata="sidedownData" :is-narrow="isNarrow"></sidedown>
        </div>
      </div>
    </template>

    <template #c2-resizeable-right>
      <main-container-layout>
        <template #top-nav>
          <div ref="targetTopleft" class="top-left">
            <topleft :topleft-data="topleftData"></topleft>
          </div>
          <div class="top-right">
            <topright></topright>
          </div>
        </template>

        <template #main-container>
          <router-view></router-view>
        </template>
      </main-container-layout>
    </template>
  </c2-resizeable-layout>
</template>

<style scoped>
/* @import url("scss/global.css");
@import url("scss/main.css"); */
.sidebar-menus {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
