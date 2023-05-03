<script setup lang="ts">
// 由于前端不能创建 File 对象, 改由后端创建 excel 文件给前端下载d
// https://github.com/optilude/xlsx-template
async function handleClick() {
  // 点击发送路由到服务器
  const response = await fetch("http://localhost:3000/print-excel")
  const result = await response.text()
  console.log(result)
}
</script>
<template>
  <h1>导出到模板</h1>
  <n-space>
    <n-button type="primary" @click="handleClick"> 导出到 excel </n-button>
  </n-space>
</template>

<style scoped></style>
