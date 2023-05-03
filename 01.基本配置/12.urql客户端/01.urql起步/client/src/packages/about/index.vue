<script setup lang="ts">
import { useQuery } from "@urql/vue"

const result = useQuery({
  query: `{
    feed {
      id
      url
      description
    }
  }`,
})
const fetching = result.fetching
const error = result.error
const links = result.data

// 分页查询
const paginate = useQuery({
  query: `query($from: Int!, $limit: Int!){
    feedPagination(from: $from, limit: $limit){
      id
      url
    }
  }`,
  variables: { from: 2, limit: 4 },
})
const paginations = paginate.data
</script>
<template>
  <h1>默认首页内容</h1>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-else>
    <ul v-if="links">
      <li v-for="link in links.feed" :key="link.id">{{ link.id }} --- {{ link.description }} --- {{ link.url }}</li>
    </ul>
  </div>
  <hr />
  <ul v-if="paginations">
    <li v-for="page in paginations.feedPagination" :key="page.id">{{ page.id }} --- {{ page.url }}</li>
  </ul>
</template>

<style scoped></style>
