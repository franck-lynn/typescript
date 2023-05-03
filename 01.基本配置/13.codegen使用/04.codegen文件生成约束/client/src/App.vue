<script setup lang="ts">
// urql 官网
// https://formidable.com/open-source/urql/docs/
import { useQuery } from "@urql/vue"
import { graphql } from "./typings/gql"
import FilmItem from "./components/FilmItem.vue"
import { computed } from "vue"

const { data } = useQuery({
  query: graphql(/* GraphQL */ `
    query allFilmsWithVariablesQuery($first: Int!) {
      allFilms(first: $first) {
        edges {
          node {
            ...FilmItem
          }
        }
      }
    }
  `),
  variables: { first: 10 },
})
console.log(data)
const films = computed(() => data.value?.allFilms?.edges?.map((e) => e?.node))
</script>

<template>
  <ul>
    <h1>入口文件</h1>
    <li v-for="(film, index) of films" :key="index"><FilmItem :film="film!" /></li>
  </ul>
</template>
