<script setup lang="ts">
import {} from "vue"
import HyperFormula from "hyperformula"

import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

registerAllModules()

const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
})

const hotSettings: GridSettings = {
  data: [
    ["150", "643", "0.32", "11", "=A1*(B1*C1)+D1"],
    ["172", "474", "0.51", "11", "=A2*(B2*C2)+D2"],
    ["188", "371", "0.59", "11", "=A3*(B3*C3)+D3"],
    ["162", "731", "0.21", "10", "=A4*(B4*C4)+D4"],
    ["133", "682", "0.81", "9", "=A5*(B5*C5)+D5"],
    ["87", "553", "0.66", "10", "=A6*(B6*C6)+D6"],
    ["26", "592", "0.62", "11", "=A7*(B7*C7)+D7"],
    ["110", "461", "0.73", "9", "=A8*(B8*C8)+D8"],
    ["50", "346", "0.52", "15", "=A9*(B9*C9)+D9"],
    ["160", "423", "0.82", "11", "=A10*(B10*C10)+D10"],
    ["30", "216", "0.26", "9", "=A11*(B11*C11)+D11"],
    ["39", "473", "0.44", "5", "=A12*(B12*C12)+D12"],
    ["96", "490", "0.43", "5", "=A13*(B13*C13)+D13"],
    ["108", "176", "0.71", "7", "=A14*(B14*C14)+D14"],
    ["46", "586", "0.01", "14", "=A15*(B15*C15)+D15"],
    ["数量合计", "Average", "Average", "Sum", "Sum"],
    ["=SUM(A1:A15)", "=ROUND(AVERAGE(B1:B15), 2)", "=ROUND(AVERAGE(C1:C15), 2)", "=SUM(D1:D15)", "=SUM(E1:E15)"],
  ],

  // colHeaders: ['Qty', 'Unit price', 'Discount', 'Freight', 'Total due (fx)'],
  colHeaders: ["数量", "单价", "折扣", "货运", "应付总额(fx)"],
  rowHeaders: true,
  height: "auto",
  formulas: {
    engine: hyperformulaInstance,
  },
  stretchH: "all",
  licenseKey: "non-commercial-and-evaluation",
}
</script>
<template>
  <HotTable :settings="hotSettings"></HotTable>
</template>

<style scoped></style>
