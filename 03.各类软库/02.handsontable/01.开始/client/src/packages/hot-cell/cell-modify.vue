<script setup lang="ts">
import { ref, onMounted } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"
import Core from "handsontable/core"

// register Handsontable's modules
registerAllModules()

const data = [
  ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"],
  ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"],
  ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"],
  ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"],
  ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"],
  ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"],
  ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"],
  ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"],
  ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"],
]

const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  width: "auto",
  height: 272,
  colWidths: 100,
  rowHeights: 23,
  rowHeaders: true,
  colHeaders: true,
  outsideClickDeselects: false,
  selectionMode: "multiple", // 'single', 'range' or 'multiple',
}

const selection = ref<HTMLButtonElement>()
const instance = ref()
onMounted(() => {
  const hot: Core = instance.value!["hotInstance"]

  selection.value?.addEventListener("click", (/* e: MouseEvent */) => {
    const selected = hot.getSelected() || []
    hot.suspendRender()
    for (let i = 0; i < selected.length; i++) {
      const [row1, column1, row2, column2] = selected[i]! // 不能为空

      const startRow = Math.max(Math.min(row1, row2), 0)
      const endRow = Math.max(row1, row2)
      const startCol = Math.max(Math.min(column1, column2), 0)
      const endCol = Math.max(column1, column2)
      for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
        for (let columnIndex = startCol; columnIndex <= endCol; columnIndex += 1) {
          hot.setDataAtCell(rowIndex, columnIndex, "data changed")
          hot.setCellMeta(rowIndex, columnIndex, "className", "c-red")
        }
      }
    }
    hot.render()
    hot.resumeRender()
  })
})
</script>
<template>
  <hot-table ref="instance" :data="data" :settings="hotSettings"></hot-table>
  <button ref="selection">修改</button>
</template>

<style>
.c-red {
  color: red;
}
</style>
