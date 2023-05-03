<script setup lang="ts">
// https://attacomsian.com/blog/javascript-download-file
import {} from "vue"

const vue2blob = () => {
  const textarea = (document.getElementById("textarea") as HTMLTextAreaElement).value
  const filename = "output.txt"
  downloadFile(textarea, filename)
}

function downloadFile(value: string, filename: string) {
  const anchor = document.createElement("a")
  anchor.setAttribute("href", "data:text/plain;charset=utf-8, " + encodeURIComponent(value))
  anchor.setAttribute("download", filename)
  anchor.style.display = "none"
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}

const vue2pdf = () => {
  const textarea = (document.getElementById("textarea") as HTMLTextAreaElement).value
  const filename = "output.pdf"
  downloadPdf(textarea, filename)
}
function downloadPdf(value: string, filename: string) {
  const blob = new Blob([value], { type: "application/pdf" })

  const URL = window.URL || window.webkitURL
  const anchor = document.createElement("a")
  anchor.href = URL.createObjectURL(blob)
  anchor.download = filename
  anchor.style.display = "none"
  anchor.click()
  URL.revokeObjectURL(anchor.href)
  anchor.remove()
}
</script>
<template>
  <textarea id="textarea" name="textarea" cols="15" rows="5"></textarea>
  <br />
  <button @click="vue2blob">web转成bolb文件并下载</button>
  <button @click="vue2pdf">web转成 pdf 文件并下载, 还没测试成功</button>
</template>

<style scoped></style>
