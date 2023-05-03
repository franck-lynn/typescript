<script setup lang="ts">
import { ref /* , onMounted  */ } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"
// import Core from "handsontable/core"
import HyperFormula from "hyperformula"

// register Handsontable's modules
registerAllModules()
const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
})

const hot = ref()

const data = [
  ["", "Tesla", "Nissan", "Toyota", "Honda"],
  ["2017", -5, "Nissan", 12, 13],
  ["2018", "", -11, 14, 13],
  ["2019", "", 15, -12, "readOnly"],
]
const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  colHeaders: true,
  rowHeaders: true,
  height: "auto",
  contextMenu: true,
  manualRowMove: true,
  minSpareRows: 1,
  
  afterCreateRow: (row: number, amount: number) => {
    // const instance: Core = hot.value!["hotInstance"]
    console.log("创建行之前触发的钩子----> ", row, amount)
    if (!hyperformulaInstance.isItPossibleToAddRows(0, [row, amount])) {
      return false
    }
  },
}

// onMounted(() => {
//   const instance: Core = hot.value!["hotInstance"]
//   instance.addHook("beforeCreateRow", (row: number, amount: number) => {
//     console.log("创建行之前触发的钩子----> ", row, amount)
//     if (!hyperformulaInstance.isItPossibleToAddRows(0, [row, amount])) {
//       return false
//     }
//   })
// })
</script>
<template>
  <HotTable ref="hot" :settings="hotSettings" :data="data"></HotTable>
</template>

<style scoped></style>
