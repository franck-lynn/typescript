<script setup lang="ts">
import {} from "vue"

import numbro from "numbro" // 一个数字格式转换插件
import zhCN from "numbro/languages/zh-CN"

import HotTable from "@handsontable/vue3"
import "handsontable/dist/handsontable.full.css"

import Handsontable from "handsontable/base"
// registerCellType cell types' registering function
import { registerCellType, NumericCellType } from "handsontable/cellTypes"
// registerPlugin plugins' registering function
import { registerPlugin, UndoRedo } from "handsontable/plugins"
// Register  modules
registerCellType(NumericCellType)
registerPlugin(UndoRedo)

numbro.registerLanguage(zhCN)

const settings: Handsontable.GridSettings = {
  colHeaders: ["Car", "Year", "Price ($)", "Price (¥)"],
  data: [
    { car: "Mercedes A 160", year: 2017, price_usd: 7000, price_cny: 7000 },
    { car: "Citroen C4 Coupe", year: 2018, price_usd: 8330, price_cny: 8330 },
    { car: "Audi A4 Avant", year: 2019, price_usd: 33900, price_cny: 33900 },
    { car: "Opel Astra", year: 2020, price_usd: 5000, price_cny: 5000 },
    { car: "BMW 320i Coupe", year: 2021, price_usd: 30500, price_cny: 30500.1234 },
  ],

  columnSorting: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation", // for non-commercial use onlys
  columns: [
    {
      data: "car",
      // 1st column is simple text, no special options here
    },
    {
      data: "year",
      type: "numeric",
    },
    {
      data: "price_usd",
      type: "numeric",
      numericFormat: {
        pattern: "$0,0.00",
        culture: "en-US", // this is the default culture, set up for USD
      },
      allowEmpty: false,
    },
    {
      data: "price_cny",
      type: "numeric",

      numericFormat: {
        pattern: "¥0,0.00",
        culture: "zh-CN", // use this for CNY ,
        // more cultures available on http://numbrojs.com/languages.html
      },
    },
  ],
}
</script>
<template>
  <hot-table :settings="settings"></hot-table>
</template>

<style scoped></style>
