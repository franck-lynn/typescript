<script setup lang="ts">
import fileDownload from "js-file-download"

async function download(e: Event) {
  e.preventDefault()
  const res = await fetch("http://localhost:3000/download", {
    method: "GET",
  })
  const data = await res.blob()
  fileDownload(data, "download.jpg")
}
</script>
<template>
  <n-button @click="download">下载文件</n-button>
</template>

<style scoped></style>
