<script setup lang="ts">
import {} from "vue"
import { HotTable, HotColumn } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"
import { ColumnSettings, GridSettings } from "handsontable/settings"

// register Handsontable's modules
registerAllModules()

const hotSettings: GridSettings = {
  data: [
    { id: 1, name: "Table tennis racket", payment: { price: 13, currency: "PLN" } },
    { id: 2, name: "Outdoor game ball", payment: { price: 14, currency: "USD" } },
    { id: 3, name: "Mountain bike", payment: { price: 300, currency: "USD" } },
  ],
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
}
const secondColumnSettings: ColumnSettings = {
  data: "name",
  title: "商品名称",
  readOnly: true,
}
const thirdColumnSetting: ColumnSettings = {
  data: "payment.price",
  title: "价格",
}
</script>
<template>
  <HotTable :settings="hotSettings">
    <hot-column title="ID" data="id" />
    <!-- <hot-column :settings="secondColumnSettings" read-only="true" data="name" /> -->
    <hot-column :settings="secondColumnSettings" />
    <!-- <hot-column title="Price" data="payment.price" /> -->
    <hot-column :settings="thirdColumnSetting" />
    <hot-column title="Currency" data="payment.currency" />
  </HotTable>
</template>

<style scoped></style>
