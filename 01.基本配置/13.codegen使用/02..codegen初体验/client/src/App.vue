<script setup lang="ts">
import { useQuery } from "@urql/vue"

import { graphql } from "./typings"

const { data } = useQuery({
  query: graphql(`
    query allPosts($title: String) {
      posts(title: $title) {
        id
        title
      }
    }
  `),
  variables: { title: "帖子2" },
})
console.log(data)

</script>
<template>
  <h1>codegen 初体验</h1>
  <ul>
    <li v-for="(post, index) in data?.posts" :key="index">{{ index }} -- {{ post?.id }} -- {{ post?.title }}</li>
  </ul>
</template>

<style scoped></style>
