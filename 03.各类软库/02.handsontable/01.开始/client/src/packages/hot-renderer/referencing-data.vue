<script setup lang="ts">
import { DefineComponent, ref } from "vue"
import { GridSettings } from "handsontable/settings"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { HotTableProps, VueProps } from "@handsontable/vue3/types"

// register Handsontable's modules
registerAllModules()

const hotSettings: GridSettings = {
  data: [
    ["A1", "B1", "C1", "D1"],
    ["A2", "B2", "C2", "D2"],
    ["A3", "B3", "C3", "D3"],
    ["A4", "B4", "C4", "D4"],
  ],
  colHeaders: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
}

const hotTableComponent = ref<DefineComponent<VueProps<HotTableProps>>>()

const swapHotData = () => {
  console.log(hotTableComponent.value)
  // hotTableComponent.value!["hotInstance"].loadData([["new", "data"]])
  hotTableComponent.value!["hotInstance"].loadData([["new", "data"]])
}
</script>
<template>
  <div id="example1">
    <hot-table ref="hotTableComponent" :settings="hotSettings"></hot-table><br />
    <button class="controls" @click="swapHotData">加载新数据</button>
  </div>
</template>

<style scoped></style>
