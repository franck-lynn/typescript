<script setup lang="ts">
import {} from "vue"
import HotTable from "@handsontable/vue3"
import { GridSettings } from "handsontable/settings"
import "handsontable/dist/handsontable.full.css"
import Core from "handsontable/core"
const hotSettings: GridSettings = {
  data: [
    ["A1", "https://handsontable.com/docs/img/examples/professional-javascript-developers-nicholas-zakas.jpg"],
    ["A2", "https://handsontable.com/docs/img/examples/javascript-the-good-parts.jpg"],
  ],
  licenseKey: "non-commercial-and-evaluation",
  columns: [
    {}, // 会自动填充进去第1列
    // -----------------------------
    {
      renderer: (
        _instance: Core, //
        td: HTMLTableCellElement,
        _row: number,
        _col: number,
        _prop: string | number,
        value: string
      ) => {
        const img = document.createElement("img")
        img.src = value
        img.addEventListener("mousedown", (e: MouseEvent) => e.preventDefault)
        td.innerText = ""
        td.appendChild(img)
        return td
      },
    },
  ],
}
</script>
<template>
  <div id="example1">
    <hot-table :settings="hotSettings"></hot-table>
  </div>
</template>

<style scoped></style>
