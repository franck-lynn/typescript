<script setup lang="ts">
import {} from "vue"

import HyperFormula from "hyperformula"

import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
})

const hotSettings: GridSettings = {
  data: [
    ["10.26", null, "Sum", "=SUM(A:A)"], // 求A列的和
    ["20.12", null, "Average", "=AVERAGE(A:A)"],
    ["30.01", null, "Median", "=MEDIAN(A:A)"],
    ["40.29", null, "MAX", "=MAX(A:A)"],
    ["50.18", null, "MIN", "=MIN(A1:A5)"],
  ],
  colHeaders: true,
  rowHeaders: true,
  height: "auto",
  formulas: {
    engine: hyperformulaInstance,
  },
  licenseKey: "non-commercial-and-evaluation",
}


</script>
<template>
  <h3 class="demo-preview">Sheet 1</h3>
  <HotTable :settings="hotSettings"></HotTable>
</template>

<style scoped>
.demo-preview {
  margin-top: 0.5rem !important;
  margin-bottom: 0.3rem !important;
  padding-top: 0 !important;
}
</style>
