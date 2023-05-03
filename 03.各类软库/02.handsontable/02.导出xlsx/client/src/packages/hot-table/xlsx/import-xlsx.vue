<script setup lang="ts">
// https://www.bilibili.com/video/BV1HD4y1R7jY?p=1&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// 导出 excel xlsx 文件的插件是 xlsx
/*
action 不指定就是undefined, 可以不用
headers http 请求需要附加的 headers
data 提交表单需要附加的数据
accept 接受的文件类型, 在点击上传按钮时, 会在自定义文件里过滤
default-upload: 选取文件默认不上传
 */
import { ref } from "vue"
import type { UploadFileInfo } from "naive-ui"
import { readFile, character } from "../utils/utils"
import * as xlsx from "xlsx"

// 采集 excel 数据 e: ProgressEvent<FileReader>
async function handle(e: { file: UploadFileInfo }) {
  /*
  e 是一个文件上传对象 UploadFileInfo
  const uploadFileInfo: UploadFileInfo = e.file
  console.log(uploadFileInfo)
  需要2次解构才能拿到 File 对象. 第1次只是 FileInfo
  */
  const { file } = e.file
  // console.log("file----> ", file)
  /*
  // 文件读取器
  const reader = new FileReader()
  // 通过读取器读取文件
  reader.readAsBinaryString(file!)
  // 监听读取器读取完成后的事件
  reader.onload = (e: ProgressEvent<FileReader>) => {
    contents.value = e.target?.result
  }
  */
  // 二进制数据
  const data = await readFile(file!)
  // 通过 xlsx 读取二进制数据
  const workbook = xlsx.read(data, { type: "binary" })
  // 拿到 sheet1
  const worksheet = workbook.Sheets[workbook.SheetNames[0]!]
  // 解析成 json 格式
  const json = xlsx.utils.sheet_to_json(worksheet!)

  type T1 = typeof character

  // console.log(json)
  // 把读取出来的数据替换成可以传递给服务器的数据(姓名: name 电话: phone)
  const arr: T1[] = []
  // item = [{姓名: "aaa", 电话: "123"}]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json.forEach((item: any) => {
    const obj = {} as T1
    for (const key in character) {
      if (!Reflect.has(character, key)) break
      // console.log(item)
      let v = character[key] // 得到 v = {text: "姓名", type: string}
      const text = v.text // 电话
      const type = v.type // string
      // item = [{姓名: "aaa", 电话: "123"}]
      v = item[text] || ""
      type === "string" ? (v = String(v)) : null
      type === "number" ? (v = Number(v)) : null
      obj[key] = v
    }
    arr.push(obj)
  })
  console.log(arr)
  contents.value = arr
}
// 提交数据给服务器
// function submit() {}

const contents = ref()

const change = async (e: Event) => {
  // 获取控件--> 文件列表--> 文件
  const file = ((e.target as HTMLInputElement).files as FileList)[0] as File
  const reader = new FileReader()
  console.log(file)
  // 读取文件
  reader.readAsBinaryString(file)
  reader.onload = (e: ProgressEvent<FileReader>) => {
    contents.value = e.target?.result
  }
}
</script>
<template>
  <div>
    <h1>文件上传</h1>

    <input id="" type="file" @change="change" />
    <div>
      <hr />
    </div>
    <n-upload
      :headers="{ 'naive-info': 'hello!' }"
      :data="{ 'naive-data': 'cool! naive!' }"
      accept=".xlsx, .xls"
      :default-upload="false"
      response-type="blob"
      @change="handle"
    >
      <n-button>上传文件</n-button>
    </n-upload>
  </div>
  <!-- <div>{{ contents }}</div> -->

  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>姓名</th>
        <th>手机</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in contents" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped></style>
