<script setup lang="ts">
import {} from "vue"
import HotTable from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
const licenseKey = "non-commercial-and-evaluation" // for non-commercial use only

// 注册 handsontable 模块
registerAllModules()

const data = [
  ["", "Ford", "Volvo", "Toyota", "Honda"],
  ["2016", 10, 11, 12, 13],
  ["2017", 20, 11, 14, 13],
  ["2018", 30, 15, 12, 13],
]
</script>
<template>
  <hot-table :data="data" :row-headers="true" :col-headers="true" :license-key="licenseKey"></hot-table>
</template>

<style scoped></style>
