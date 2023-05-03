<script setup lang="ts">
// urql 官网
// https://formidable.com/open-source/urql/docs/
// https://www.youtube.com/watch?v=34XUUJpyj9A&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=2

import { useQuery } from "@urql/vue"
import { UserDocument } from "./typings/graphql"

// const showBooks = useQuery({ query: ShowBooks })
// 不用上面的查询语句, 采用类型安全的 ./typings/graphql/ShowBooksDocument
// 前端会去查找 vue 文件里的 gql, 生成 ShowBooksDocument
// 例如, 上面的 query ShowBooks {...} 会生成
// export const ShowBooksDocument =  ... 这条导出,
// 现在在把 ts 文件改成 graphql 文件
// const usersResult = useQuery({ query: UserDocument })
const usersResult = useQuery({ query: UserDocument })
// console.log(usersResult.data.value)
// console.log(usersResult.fetching.value)
// console.log(usersResult.error.value)
// 解构时顺手重命名
const { data: renameData /*  fetching, error */ } = useQuery({ query: UserDocument })
// usersResult.data.value?.user
</script>

<template>
  <h1>入口文件</h1>

  <div v-if="usersResult.fetching.value">Loading...</div>
  <div v-else-if="usersResult.error.value">{{ usersResult.error.value }}</div>
  <div v-else>
    {{ usersResult.data.value?.user }}
    <hr />
    {{ renameData?.user.name }}
  </div>
</template>
