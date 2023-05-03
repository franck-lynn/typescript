<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const generateData = (rows = 3, columns = 7, additionalRows = true) => {
  let counter = 0

  const array2d = [...new Array(rows)].map(() => [...new Array(columns)].map(() => counter++))

  if (additionalRows) {
    array2d.push([])
    array2d.push([])
  }

  return array2d
}
console.log(generateData())
const hotSettings: GridSettings = {
  data: generateData(),
  licenseKey: "non-commercial-and-evaluation",
  colHeaders: true,
  rowHeaders: true,
  height: "auto",
  contextMenu: true,
  manualRowMove: true,
  bindRowsWithHeaders: "strict",
}
</script>
<template>
  <div id="example">
    <hot-table :settings="hotSettings"></hot-table>
  </div>
</template>

<style scoped></style>
