<script setup lang="ts">
import { ref } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { CellMeta, CellProperties, GridSettings } from "handsontable/settings"
import Core from "handsontable/core"
import Handsontable from "handsontable"
// import { VueProps, HotTableProps } from "@handsontable/vue3/types"

// register Handsontable's modules
registerAllModules()

const templateValues = ["one", "two", "three"]

const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  data: [
    ["", "Tesla", "Nissan", "Toyota", "Honda"],
    ["2017", 10, 11, 12, 13],
    ["2018", 20, 11, 14, 13],
    ["2019", 30, 15, 12, 13],
    ["2020", 30, 15, 12, 13],
    ["2021", 30, 15, 12, 13],
  ],
  startRows: 8,
  startCols: 5,
  minSpareRows: 1,
  contextMenu: true,
  height: "auto",

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cells: (row: number, col: number, _prop: string | number) => {
    const cellProperties: CellMeta = { row, col }
    cellProperties.renderer = defaultValueRenderer
    return cellProperties
  },
  beforeChange,
}

// const hot = ref<DefineComponent<VueProps<HotTableProps>>>()
const hot = ref()
function beforeChange(changes: (Handsontable.CellChange | null)[]) {
  const instance: Core = hot.value["hotInstance"]
  const columns = instance.countCols()
  // changes 是 [row, column, 改变之前值, 改变之后值] 的一个数组
  const rowColumnSeen = {}
  const rowsToFill = {}

  for (let i = 0; i < changes.length; i++) {
    // if oldVal is empty
    if (changes[i]![2] === null && changes[i]![3] !== null) {
      if (isEmptyRow(instance, changes[i]![0])) {
        // add this row/col combination to the cache so it will not be overwritten by the template
        rowColumnSeen[changes[i]![0] + "/" + changes[i]![1]] = true
        rowsToFill[changes[i]![0]] = true
      }
    }
  }

  for (const r in rowsToFill) {
    // if (rowsToFill.hasOwnProperty(r)) {
    if (Reflect.has(rowsToFill, r)) {
      for (let c = 0; c < columns; c++) {
        // if it is not provided by user in this change set, take the value from the template
        if (!rowColumnSeen[r + "/" + c]) {
          changes.push([parseInt(r), c, null, templateValues[c]])
        }
      }
    }
  }
}

// https://handsontable.com/docs/javascript-data-grid/row-prepopulating/
function defaultValueRenderer(
  instance: Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: string | number,
  cellProperties: CellProperties
) {
  console.log(isEmptyRow(instance, row))
  if (prop === null && isEmptyRow(instance, row)) {
    prop = templateValues[col]!
    td.style.backgroundColor = "green"
  } else {
    td.style.color = "red"
  }
  Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isEmptyRow(instance: Core, row: number) {
  // 获取所有的行数, 应该有 7 行, 有 1 行为空, 由最小空行数定义的
  // const rowCount: number = instance.countRows()
  // console.log("行数----> ", rowCount)
  // console.log("第几行----> ", row)
  const data = instance.getData()
  for (let i = 0, ilen = data[row].length; i < ilen; i++) {
    if (data[i] !== null) {
      return false
    }
    console.log("得到每一行---> ", data[row][i])
  }
  return true
}
</script>
<template>
  <HotTable ref="hot" :settings="hotSettings"></HotTable>
</template>

<style scoped></style>
