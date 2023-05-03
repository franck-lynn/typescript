<script setup lang="ts">
import { watchEffect } from "vue"
// 用下面的2种方式查询都是可以的
// import { useQuery } from "@urql/vue"
// import { HelloDocument } from "typings/index"
// const { data } = useQuery({ query: HelloDocument })
// console.log(data)

import { useHelloQuery } from "typings/index"
const { data /*  error, fetching */ } = useHelloQuery()

watchEffect(() => {
  if (data.value) {
    console.log(data.value.hello)
  }
})
</script>
<template>
  <h1>codegen 前端测试 hello</h1>
  {{ data?.hello }}
</template>
