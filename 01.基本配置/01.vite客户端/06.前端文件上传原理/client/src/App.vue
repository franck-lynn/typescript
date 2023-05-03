<script setup lang="ts">
// 创建一个文件对象
const file = new File(["aaabbbccc123"], "文件名.txt", { type: "txt" })
// console.log("01. 打印文件---> ", file)
// 分片大小
const size = 3
const url = "https://httpbin.org/post"
// 分片函数, 分成 Blob 对象
async function chunkUpFn() {
  for (let i = 0; i < file.size; i += size) {
    const chunk = file.slice(i, i + size)
    // console.log(chunk)
    // 创建 formData 对象
    const upData = new FormData()
    upData.append("chunkData", chunk) // 把分片装进 FormData 对象
    // 上传到服务器, 在浏览器 network 可以看到几次 post
    // 设计工作中, 分片每片都要id, 要判断这个id 有没有, 如果有, 如何?...
    const result = await fetch(url, { method: "post", body: upData })
    console.log(await result.text())
  }
}
chunkUpFn()
</script>
<template>
  <div>
    <h1>文件对象上传原理</h1>
    <!-- <p>
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
    </p> -->
  </div>
</template>

<style scoped></style>
