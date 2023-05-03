<script setup lang="ts">
import { ref } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { CellProperties, GridSettings } from "handsontable/settings"
import Core from "handsontable/core"
import Handsontable from "handsontable"

// register Handsontable's modules
registerAllModules()

// maps function to a lookup string
Handsontable.renderers.registerRenderer("negativeValueRenderer", negativeValueRenderer)

const instance = ref()

const data = [
  ["", "Tesla", "Nissan", "Toyota", "Honda"],
  ["2017", -5, "Nissan", 12, 13],
  ["2018", "", -11, 14, 13],
  ["2019", "", 15, -12, "readOnly"],
]

const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",

  afterSelection: (_row: number, _col: number, row2: number, col2: number) => {
    const hot: Core = instance.value["hotInstance"]
    const meta = hot.getCellMeta(row2, col2)
    // console.log("选择过后触发---> ", meta)
    if (meta.readOnly) {
      // 更改初始化的设置, fillHandle 填充句柄
      // true	- 在所有方向上启用自动填充, 也就是可以拉动的意思
      // https://handsontable.com/docs/javascript-data-grid/api/options/#fillhandle
      // 可以设置方向, 只能垂直填充
      hot.updateSettings({ fillHandle: false })
    } else {
      hot.updateSettings({
        fillHandle: {
          autoInsertRow: true, // 如果到达底部, 禁止添加新行
          direction: "vertical",
        },
      })
    }
  },
  // 修改单元格样式
  cells: (row: number, col: number) => {
    const cellProperties = {} as CellProperties
    const hot = instance.value["hotInstance"]
    const data = hot.getData()

    if (row === 0 || (data[row] && data[row][col] === "readOnly")) {
      cellProperties.readOnly = true
    }
    if (row === 0) {
      cellProperties.renderer = firstRowRender
    } else {
      // 采用注册制
      cellProperties.renderer = "negativeValueRenderer" // uses lookup map
    }
    return cellProperties
  },
}

function firstRowRender(
  instance: Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: string | number,
  cellProperties: CellProperties
) {
  Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties)
  td.style.fontWeight = "bold"
  td.style.color = "green"
  td.style.background = "#CEC"
}

function negativeValueRenderer(
  instance: Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: string,
  cellProperties: CellProperties
) {
  Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties)
  // if the row contains a negative number
  if (parseInt(value, 10) < 0) {
    // add class 'make-me-red'
    td.className = "make-me-red"
  }
  if (!value || value === "") {
    td.style.background = "grey"
  } else {
    if (value === "Nissan") {
      td.style.color = "yellowgreen"
    } else {
      td.style.background = ""
    }
  }
}
</script>
<template>
  <hot-table ref="instance" :data="data" :settings="hotSettings"></hot-table>
</template>

<style>
/* .handsontable {
  font-size: 36px !important;
  font-size: 13px;
  font-weight: normal;
  color: #373737;
} */
.make-me-red {
  color: red;
}
</style>
