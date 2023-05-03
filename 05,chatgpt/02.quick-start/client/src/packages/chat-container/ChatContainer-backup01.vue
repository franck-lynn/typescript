<script setup lang="ts">
// https://stackoverflow.com/questions/72326140/openai-api-refused-to-set-unsafe-header-user-agent
// 由于使用了密钥, 浏览器给出了一个警告
// 拒绝设置不安全的标头“用户代理”
// 改由手动提交
import { Configuration, OpenAIApi } from "openai"

import { ref } from "vue"

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
</script>
<template>
  <n-input v-model:value="value" type="textarea" placeholder="基本的 Textarea" />
  <n-button type="primary" @click="handleClick"> 向 chat gpt 发送信息 </n-button>
  <p>{{ message }}</p>
</template>

<style scoped></style>
