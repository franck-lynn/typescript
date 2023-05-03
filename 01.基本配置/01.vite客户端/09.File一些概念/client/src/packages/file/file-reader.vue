<script setup lang="ts">
import { ref } from "vue"
const change = (e: Event) => {
  // 获取文件对象, 通过控件对象获取选择的文件对象集合
  // 01, 获取控件对象
  const oInput = e.target as HTMLInputElement
  // 02. 通过控件对象, 获取文件集合
  const files = oInput.files as FileList
  // 03. 获取文件对象中的单个文件对象
  const file = files[0] as File
  // 04. 读取文件的读取器
  const reader = new FileReader()
  // 05. 通过读取器读取文件, 传入 file 对象
  reader.readAsText(file)
  // 加载前触发
  reader.onloadstart = function (e: ProgressEvent<FileReader>) {
    console.log("加载前...", e.target)
  }
  // 加载完成触发
  reader.onload = (e: ProgressEvent<FileReader>) => {
    content.value = e.target?.result
  }
  // 加载过程中会一直触发
  reader.onprogress = function () {
    console.log("加载过程....")
  }
  // 加载结束触发, 加载完成并不代表加载结束
  reader.onloadend = () => {
    console.log("加载结束...")
  }
  console.log(file)
}
const content = ref()
</script>
<template>
  <input type="file" accept="text/plain" @change="change" />
  <div>{{ content }}</div>
</template>

<style scoped></style>
