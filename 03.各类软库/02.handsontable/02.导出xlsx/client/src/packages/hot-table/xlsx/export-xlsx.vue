<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

import { read, utils, writeFileXLSX } from "xlsx"
import { excel2Json } from "../utils/excel2json"

import Core from "handsontable/core"

const rows = ref()
const data = ref()
const hot = ref()

/* 定义excel 表格中的数据类型 */
// type XlsType = Record<string, number>
type JsonType = Record<string, { text: string; type: string }>
type V = string | number
type F = (v: V) => V
type FunctionsType = Record<string, F>

const character: JsonType = {
  name: { text: "Name", type: "string" },
  index: { text: "Index", type: "number" },
}
const fn: FunctionsType = {
  string: (v: V) => String(v),
  number: (v: V) => Number(v),
}

// register Handsontable's modules
registerAllModules()

onMounted(async () => {
  const f = await fetch("https://sheetjs.com/pres.numbers")
  const ab = await f.arrayBuffer()
  /* parse workbook */
  const wb = read(ab)

  /* update data */
  rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]!]!)
  // console.log(rows.value)

  const json = excel2Json(rows.value, character, fn)
  console.log(json)

  // @ts-ignore
  data.value = json
  // console.log(json)
  // console.log(data.value)

  // 更新数据要采用 upData() 的方法
  const instance: Core = hot.value["hotInstance"]
  instance.updateSettings({
    colHeaders: ["姓名", "第几届"],
  })
  instance.updateData(data.value)
})
watch(data, (newval, oldVal) => {
  console.log("新", newval)
  console.log("旧", oldVal)
})

const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",

  // columns: [{ data: "name" }, { data: "index" }],
}

/* get state data and export to XLSX */
function exportFile() {
  const ws = utils.json_to_sheet(rows.value)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "Data")
  writeFileXLSX(wb, "SheetJSVueAoO.xlsx")
}
</script>
<template>
  <table>
    <thead>
      <th>Name</th>
      <th>Index</th>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in rows" :key="idx">
        <td>{{ row.Name }}</td>
        <td>{{ row.Index }}</td>
      </tr>
    </tbody>
    <tfoot>
      <td colSpan="{2}">
        <button @click="exportFile">Export XLSX</button>
      </td>
    </tfoot>
  </table>

  <hot-table ref="hot" :settings="hotSettings" :data="data" />
</template>

<style scoped></style>
