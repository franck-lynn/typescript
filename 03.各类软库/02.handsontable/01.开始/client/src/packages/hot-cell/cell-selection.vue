<script setup lang="ts">
import { ref, onMounted } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"
import Core from "handsontable/core"

// register Handsontable's modules
registerAllModules()
const data = [
  ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"],
  ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"],
  ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"],
  ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"],
  ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"],
  ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"],
  ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"],
  ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"],
  ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"],
]
const hotSettings: GridSettings = {
  licenseKey: "non-commercial-and-evaluation",
  width: "auto",
  height: "auto",
  colWidths: 100,
  rowHeights: 23,
  rowHeaders: true,
  colHeaders: true,
  selectionMode: "multiple", // 'single', 'range' or 'multiple',
  outsideClickDeselects: false, // 在外部选中时, 这个选择不能取消, 否则, 就只能得到空值了
}
const selection = ref<HTMLButtonElement>()
const hot = ref()
const output = ref()

onMounted(() => {
  const instance: Core = hot.value!["hotInstance"]
  // console.log(instance.getSelected()) // 哪个单元格被选中?
  selection.value?.addEventListener("click", (/* e: MouseEvent */) => {
    const selected = instance.getSelected() || []
    const data: string[][] = [] // 给 output 标签用的, 是一个2维数组
    for (let i = 0; i < selected.length; i++) {
      // 获取选择的单元格的坐标信息
      const item = selected[i]
      // 根据坐标信息得到具体哪个或哪些单元格中的值
      const datum: string[] = instance.getData(...item!)
      // console.log("获取的数据是一个2维数组---> ", datum)
      data.push(datum) // 现在变成3维了
    }
    output.value.innerText = JSON.stringify(data)
  })
})
</script>
<template>
  <hot-table ref="hot" :data="data" :settings="hotSettings"></hot-table>
  <output ref="output" class="console">Here you will see the log</output>
  <button ref="selection">选定单元格修改</button>
</template>

<style scoped></style>
