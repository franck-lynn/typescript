<script setup lang="ts">
import {} from "vue"
import { HotTable, HotColumn } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { ColumnSettings, GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const data = [
  ["A1", "B1"],
  ["A2", "B2"],
  ["A3", "B3"],
  ["A4", "B4"],
  ["A5", "B5"],
  ["A6", "B6"],
  ["A7", "B7"],
  ["A8", "B8"],
  ["A9", "B9"],
  ["A10", "B10"],
]
const hotSettings: GridSettings = {
  data,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
}
const firstColumnSettings: ColumnSettings = {
  title: "第1列",
}
const secondColumnSettings: ColumnSettings = {
  title: "第2列只读",
}
</script>
<template>
  <hot-table :settings="hotSettings">
    <HotColumn :settings="firstColumnSettings"></HotColumn>
    <hot-column :settings="secondColumnSettings" read-only="true"> </hot-column>
  </hot-table>
</template>

<style scoped></style>
