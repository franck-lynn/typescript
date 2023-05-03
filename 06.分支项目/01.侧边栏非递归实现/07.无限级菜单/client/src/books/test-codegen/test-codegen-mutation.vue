<script setup lang="ts">
import { watchEffect } from "vue"
import { useLoginMutation } from "typings/index"

const data = {
  loginInput: {
    email: "lry_demry@163.com",
    password: "123456Aa",
  },
}
const { executeMutation } = useLoginMutation()

watchEffect(async () => {
  const s = await executeMutation(data)
  console.log(s.data)
})
</script>
<template>
  <h1>codegen 测试 mutation</h1>
  <!-- {{ result }} -->
</template>

<style scoped></style>
