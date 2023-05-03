<script setup lang="ts">
// https://stackoverflow.com/questions/72326140/openai-api-refused-to-set-unsafe-header-user-agent
import { Configuration, OpenAIApi } from "openai"

import { ref } from "vue"
import {ReadableOptions} from 'stream'

import { OPENAPI_API_KEY } from "../../constants"

console.log(OPENAPI_API_KEY)

const configuration = new Configuration({
  apiKey: OPENAPI_API_KEY,
})

const openapi = new OpenAIApi(configuration)

const value = ref()
const message = ref("")
const handleClick = async () => {
  const completion = await openapi.createCompletion({
    model: "text-davinci-003",
    prompt: "hello world , chatgpt",
  })

  console.log(completion.data.choices[0]?.text)
  if (completion.data.choices[0]?.text) {
    message.value = completion.data.choices[0]?.text
  }
}

// 递归出来 open api 返回的可读流
async function fetchStream(stream: ReadableStream) {
  const reader = stream.getReader()
  let charsReceived = 0
  const li = document.createElement("li")

  // read() returns a promise that resolves
  // when a value has been received
  const result = await reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log("Stream complete")
      return li.innerText
    }
    // value for fetch streams is a Uint8Array
    charsReceived += value.length
    const chunk = value
    console.log(`Received ${charsReceived} characters so far. Current chunk = ${chunk}`)
    li.appendChild(document.createTextNode(chunk))
    return reader.read().then(processText)
  })
  const list = result.split(",")
  const numList = list.map((item) => {
    return parseInt(item)
  })
  const text = String.fromCharCode(...numList)
  const response = JSON.parse(text)
  return response
}
</script>
<template>
  <n-input v-model:value="value" type="textarea" placeholder="基本的 Textarea" />
  <n-button type="primary" @click="handleClick"> 向 chat gpt 发送信息 </n-button>
  <p>{{ message }}</p>
</template>

<style scoped></style>
