<script setup lang="ts">
// 直接前端导出并下载, 不通过后端服务器.
// 用 xlsx-populate 先设置好模板, 把数据填充到模板然后再下载
// 前端要用这个 browser 导出, 不然会出现 Buffer is not defined 错误
// import XlsxPopulate from "xlsx-populate/browser/xlsx-populate"
// 由于前端不能创建 File 对象, 改由后端创建 excel 文件给前端下载呢?
// https://github.com/optilude/xlsx-template
import { wb } from "./xlsx-populater"
async function handleClick() {
  const blob = await wb()
  // blob2file(blob, "aName.xlsx")
}
/* 
async function handleClick() {
  // 加载一个空的工作簿
  const workbook = await XlsxPopulate.fromBlankAsync()
  // 所有工作表 sheets()
  // 第1个工作表
  const sheet1 = workbook.sheet(0)
  // 页边距预设
  sheet1.pageMarginsPreset("narrow")
  console.log("工作簿1的上边距 ---> ", sheet1.pageMargins("top")) // 0.75
  // A1 单元格内容
  const A1 = sheet1.cell("A1")
  // 第1行高度设置为 100
  const R1 = sheet1.row(1).height(100)
  console.log("第1行高度---> ", R1)
  A1.value("This was created in the browser!").style("fontColor", "ff0000")
  // 设置 excel 表格 A2开始的数据
  const A2 = workbook.sheet(0).cell("A2")
  A2.value([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
  // 页边距设置
  // 得到一个类文件对象 https://pqina.nl/blog/convert-a-blob-to-a-file-with-javascript/
  // 可以转化为实际的文件,
  const blob: Blob = await workbook.outputAsync()
  // const file = new File([blob], "aName.xlsx")
  // console.log(file instanceof File) // true
  // console.log(blob instanceof File) // false
  // console.log(blob instanceof Blob) // true
  // console.log(file)
  blob2file(blob, "aName.xlsx")
}
 */
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
