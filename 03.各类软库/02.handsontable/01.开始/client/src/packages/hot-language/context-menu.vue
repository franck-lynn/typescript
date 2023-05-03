<script setup lang="ts">
import {} from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { GridSettings } from "handsontable/settings"

import { registerLanguageDictionary, zhCN } from "handsontable/i18n"
import { ContextMenu } from "handsontable/plugins/contextMenu"
registerLanguageDictionary(zhCN)

// register Handsontable's modules
registerAllModules()
const language = "zh-CN"
const hotSettings: GridSettings = {
  data: [
    ["A1", "B1", "C1", "D1", "E1"],
    ["A2", "B2", "C2", "D2", "E2"],
    ["A3", "B3", "C3", "D3", "E3"],
    ["A4", "B4", "C4", "D4", "E4"],
    ["A5", "B5", "C5", "D5", "E5"],
  ],
  colHeaders: true,
  licenseKey: "non-commercial-and-evaluation",
  contextMenu: {
    items: {
      row_above: {
        name: "Insert row above this one (custom name)", // 会覆盖默认的菜单
      },
      // --------------------------------
      row_below: {}, // 默认的菜单, 会转化为中文
      // --------------------------------
      separator: ContextMenu.SEPARATOR,
      // --------------------------------
      clear_custom: {
        name: "Clear all cells (custom)",
        callback() {
          this.clear()
        },
      },
      // --------------------------------
    },
  },
}
</script>
<template>
  <div id="example1">
    <hot-table :language="language" :settings="hotSettings"></hot-table>
  </div>
</template>

<style scoped></style>
