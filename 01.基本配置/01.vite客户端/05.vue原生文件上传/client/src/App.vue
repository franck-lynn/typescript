<script setup lang="ts">
import { onMounted } from "vue"

const UPLOAD_INFO = {
  NO_FILE: "请先选择文件",
  INVALID_TYPE: "不支持该类型文件",
  UPLOAD_FAILED: "上传失败",
  UPLOAD_SUCCESS: "上传成功",
}
const ALLOWED_TYPE = {
  "video/mp4": "mp4",
  "image/jpeg": "jpg",
}
const BASE_URL = "http://localhost:3000/"
const API = {
  UPLOAD_VIDEO: BASE_URL + "upload_video",
}
onMounted(() => {
  const oProgress = document.querySelector("#uploadProgress") as HTMLProgressElement
  const oUpload = document.querySelector("#videoUploader") as HTMLInputElement
  const oInfo = document.querySelector("#uploadInfo") as HTMLSpanElement
  const oBtn = document.querySelector("#uploadBtn") as HTMLButtonElement

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtn?.addEventListener("click", uploadVideo, false)
  }

  async function uploadVideo() {
    // console.log(oUpload.files)
    // 拿到文件
    const file = (oUpload.files as FileList)[0]
    if (!file) {
      oInfo.innerText = UPLOAD_INFO["NO_FILE"]
      return
    }
    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO["INVALID_TYPE"]
      return
    }
    const { name, type, size } = file

    oProgress.max = size // 进度条的长度size
    oInfo.innerText = "" // 信息置为''
    // 命名文件
    const filename = new Date().getTime() + "_" + name

    const formData = createFormData({
      name,
      type,
      size: size + "",
      filename,
      uploadedSize: size + "",
      file,
    })
    try {
      const uploadResult = await fetch(API["UPLOAD_VIDEO"], { method: "POST", body: formData })
      console.log("返回的结果====> ", uploadResult)
    } catch (e) {
      // 上传失败了
      oInfo.innerText = `${UPLOAD_INFO["UPLOAD_FAILED"]} (${e})`
    }

    oInfo.innerText = UPLOAD_INFO["UPLOAD_SUCCESS"]
    oUpload.value = ""
  }

  function createFormData({
    name,
    type,
    size,
    filename,
    uploadedSize,
    file,
  }: {
    name: string
    type: string
    size: string
    filename: string
    uploadedSize: string
    file: Blob
  }) {
    const fd = new FormData()
    fd.append("name", name)
    fd.append("type", type)
    fd.append("size", size)
    fd.append("filename", filename)
    fd.append("uploadedSize", uploadedSize)
    fd.append("avatar", file)
    return fd
  }

  init()
})
</script>
<template>
  <div>
    <p>
      <progress id="uploadProgress" value="0"></progress>
    </p>
    <p>
      <input id="videoUploader" name="avatar" type="file" value="" />
    </p>
    <p>
      <span id="uploadInfo"> </span>
    </p>
    <p>
      <button id="uploadBtn">上传视频</button>
    </p>
  </div>
</template>

<style scoped></style>
