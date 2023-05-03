<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const hotSettings: GridSettings = {
  data: [
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1"],
    ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "J2"],
    ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "J3"],
    ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4"],
    ["不含税合计:", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5"],
  ],
  colHeaders: true,
  rowHeaders: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
  // row, column 相当于左上角的坐标, 
  mergeCells: [{ row: 4, col: 0, rowspan: 1, colspan: 8 }],
}
</script>
<template>
  <h1>列分组</h1>
  <HotTable :settings="hotSettings"></HotTable>
</template>

<style scoped></style>
