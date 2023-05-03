<script setup lang="ts">
import {} from "vue"
import { HotTable, HotColumn } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { ColumnSettings, GridSettings } from "handsontable/settings"

import numbro from "numbro"
import languages from "numbro/dist/languages.min.js"
// import zhCN from "numbro/languages/zh-CN"
// import jaJP from "numbro/languages/ja-JP"

// import { NumericFormatOptions } from "handsontable/common"

// register Handsontable's modules
registerAllModules()

// register the languages you need
// numbro.registerLanguage(jaJP)
// numbro.registerLanguage(zhCN)
// 在 numbro/language 中找到对应语言的缩写
numbro.registerLanguage(languages["zh-CN"])
// numbro.registerLanguage(zhCN)
numbro.registerLanguage(languages["ja-JP"])

const hotData = [
  {
    productName: "Product A",
    CN_price: 1.32,
    JP_price: 100.56,
  },
  {
    productName: "Product B",
    CN_price: 2.22,
    JP_price: 453.5,
  },
  {
    productName: "Product C",
    CN_price: 3.1,
    JP_price: 678.1,
  },
]

const hotSettings: GridSettings = {
  data: hotData,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
}
const firstColumnSetting: ColumnSettings = {
  data: "productName",
  title: "产品名称",
  width: 120,
  readOnly: true,
}
const secondColumnSetting: ColumnSettings = {
  data: "CN_price",
  title: "人民币价格",
  width: 120,
  numericFormat: { pattern: "0,0.00 $", culture: "zh-CN" },
}
const thirdColumnSetting: ColumnSettings = {
  data: "JP_price",
  title: "日元价格",
  width: 120,
  type: "numeric",
  numericFormat: { pattern: "0,0.00 $", culture: "ja-JP" },
}
// ¥
// const formatJP: NumericFormatOptions = { pattern: "0,0.00 $", culture: "ja-JP" }
</script>
<template>
  <div id="example1">
    <hot-table :settings="hotSettings">
      <hot-column :settings="firstColumnSetting"></hot-column>
      <hot-column :settings="secondColumnSetting"></hot-column>
      <hot-column :settings="thirdColumnSetting"></hot-column>
    </hot-table>
  </div>
</template>

<style scoped></style>
