<script setup lang="ts">
import { ref } from "vue"
import type { UploadFileInfo } from "naive-ui"
import { useMessage } from "naive-ui"

const message = useMessage()
const formData = ref()

async function upload(e: { file: UploadFileInfo }) {
  const { file } = e.file
  if (!file) return
  // 利用 formDate, 将文件存储在 formData 对象中
  formData.value = new FormData()

  formData.value.append("file", file)

  // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
  // const response = await fetch("http://localhost:3000/uploads", {
  //   method: "PUT",
  //   body: formData.value,
  // })
  // const result = await response.text()

  // message.info(result)
}
async function submit() {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch("http://localhost:3000/uploads", {
    method: "POST",
    body: formData.value,
  })
  const result = await response.text()

  message.info(result)
}
</script>
<template>
  <div class="upload">
    <n-upload
      :headers="{ 'naive-info': 'hello!' }"
      :data="{ 'naive-data': 'cool! naive!' }"
      :default-upload="false"
      @change="upload"
    >
      <n-button>选择文件</n-button>
    </n-upload>
    <n-button @click="submit">上传文件</n-button>
  </div>
</template>

<style scoped>
.upload {
  display: flex;
}
.n-upload,
.n-button {
  width: 100px;
}
</style>
