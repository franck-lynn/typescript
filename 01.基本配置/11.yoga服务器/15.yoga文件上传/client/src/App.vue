<script setup lang="ts">
import { ref } from "vue"
import { useMutation } from "@urql/vue"
// urql 官网
// https://formidable.com/open-source/urql/docs/
const file = ref<File>()

const uploadResult = useMutation(`
  mutation($file: Upload!){
    singleUpload(file: $file){
      url
    }
  }
`)

const uploadFile = (e: Event) => {
  // console.log(((e.target as HTMLInputElement).files as FileList)[0])
  const fd = ((e.target as HTMLInputElement).files as FileList)[0]
  console.log(fd)
  // file.value = fd
  uploadResult.executeMutation({ file: fd }).then((result) => {
    console.log(result.data)
  })
}
</script>

<template>
  <h1>上传文件</h1>
  <div class="center"><input ref="file" type="file" name="avatar" @change="uploadFile" /><br /></div>
</template>

<style>
@import url("scss/global.css");
@import url("scss/main.css");
</style>
