<script setup lang="ts">
import { ref } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"
import Core from "handsontable/core"

import type { ExportFile } from "handsontable/plugins"

// register Handsontable's modules
registerAllModules()
const data = [
  ["A1", "B1", "C1", "D1", "E1", "F1", "G1"],
  ["A2", "B2", "C2", "D2", "E2", "F2", "G2"],
  ["A3", "B3", "C3", "D3", "E3", "F3", "G3"],
  ["A4", "B4", "C4", "D4", "E4", "F4", "G4"],
  ["A5", "B5", "C5", "D5", "E5", "F5", "G5"],
  ["A6", "B6", "C6", "D6", "E6", "F6", "G6"],
  ["A7", "B7", "C7", "D7", "E7", "F7", "G7"],
]
const hotSettings: GridSettings = {
  colHeaders: true,
  rowHeaders: true,
  hiddenRows: { rows: [1, 3, 5], indicators: true },
  hiddenColumns: { columns: [1, 3, 5], indicators: true },
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
}

const hot = ref()

function handleClick() {
  // 获取实例
  const instance: Core = hot.value["hotInstance"]
  const exportPlugin: ExportFile = instance.getPlugin("exportFile")
  exportPlugin.downloadFile("csv", {
    bom: false,
    columnDelimiter: ",",
    columnHeaders: false,
    exportHiddenColumns: true,
    exportHiddenRows: true,
    fileExtension: "csv",
    filename: "Handsontable-CSV-file_[YYYY]-[MM]-[DD]",
    mimeType: "text/csv",
    rowDelimiter: "\r\n",
    rowHeaders: true,
  })
}
</script>
<template>
  <HotTable ref="hot" :data="data" :settings="hotSettings" />

  <div class="controls">
    <button id="export-file" @click="handleClick">Download file</button>
  </div>
</template>

<style scoped></style>
