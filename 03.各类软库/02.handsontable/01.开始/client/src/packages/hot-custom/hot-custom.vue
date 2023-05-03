<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const hotSettings: GridSettings = {
  startRows: 5,
  startCols: 6,
  colHeaders: true,
  stretchH: "all",
  licenseKey: "non-commercial-and-evaluation",
}
const id = "my-custom-id"
const className = "my-custom-classname"
const style = "height: 142px; overflow: hidden; border: 1px solid red;"
</script>
<template>
  <div id="example1">
    <hot-table :id="id" :class="className" :style="style" :settings="hotSettings"></hot-table>

    <!-- <hot-table :settings="hotSettings"></hot-table> -->
  </div>
</template>

<style scoped></style>
