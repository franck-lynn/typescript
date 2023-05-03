<script setup lang="ts">
// urql 官网
// https://formidable.com/open-source/urql/docs/
// https://www.youtube.com/watch?v=34XUUJpyj9A&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=2

import { useQuery } from "@urql/vue"
import { CartDocument } from "./typings/graphql"

const result = useQuery({ query: CartDocument, variables: { id: "wtf" } })
const { data } = result
</script>

<template>
  <h1>入口文件</h1>
  {{ data?.cart.totalItems }}
</template>
