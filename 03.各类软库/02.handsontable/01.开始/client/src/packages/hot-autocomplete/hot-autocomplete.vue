<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const data = [
  ["BMW", 2017, "black", "black"],
  ["Nissan", 2018, "blue", "blue"],
  ["Chrysler", 2019, "yellow", "black"],
  ["Volvo", 2020, "white", "gray"],
]
const colors = [
  "yellow",
  "red",
  "orange and another color",
  "green",
  "blue",
  "gray",
  "black",
  "white",
  "purple",
  "lime",
  "olive",
  "cyan",
]
const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  colHeaders: ["汽车", "年份", "车身颜色", "发动机颜色"],
  columns: [
    { type: "autocomplete", source: ["BMW", "Chrysler", "Nissan", "Suzuki", "Toyota", "Volvo"], strict: false },
    { type: "numeric" },
    { type: "autocomplete", source: colors, strict: false, visibleRows: 4 },
    // 严格模式表示必须要选择其中一个填入, 强行填入会显示红色 非严格模式则不一定要选择已有的
    { type: "autocomplete", source: colors, strict: true, trimDropdown: false },
  ],
}
</script>
<template>
  <HotTable :data="data" :settings="hotSettings"></HotTable>
</template>

<style scoped></style>
