<script setup lang="ts">
// 直接前端导出并下载, 不通过后端服务器.
// 用exceljs库, 不采用 xlsx-populate 库
import { wb } from "./xlsx-exceljs"
async function handleClick() {
  const blob = await wb()
  // blob2file(blob, "aName.xlsx")
}

function blob2file(blob: Blob | File, filename: string) {
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}
</script>
<template>
  <h1>导出到模板</h1>
  <n-space>
    <n-button type="primary" @click="handleClick"> 导出到 excel </n-button>
  </n-space>
</template>

<style scoped></style>
