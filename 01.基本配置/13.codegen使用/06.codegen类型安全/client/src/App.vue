<script setup lang="ts">
// urql 官网
// https://formidable.com/open-source/urql/docs/
// https://www.youtube.com/watch?v=34XUUJpyj9A&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=2
import { ref } from "vue"
import { gql, useMutation, useQuery } from "@urql/vue"
import { CreateBookMutationVariables, ShowBooksDocument } from "./typings/graphql"
// const ShowBooks = gql`
//   query ShowBooks {
//     app {
//       books {
//         id
//         title
//       }
//     }
//   }
// `
gql`
  query ShowBooks {
    app {
      books {
        id
        title
      }
    }
  }
`
// const showBooks = useQuery({ query: ShowBooks })
// 不用上面的查询语句, 采用类型安全的 ./typings/graphql/ShowBooksDocument
// 前端会去查找 vue 文件里的 gql, 生成 ShowBooksDocument
// 例如, 上面的 query ShowBooks {...} 会生成
// export const ShowBooksDocument =  ... 这条导出,
const showBooks = useQuery({ query: ShowBooksDocument })
showBooks.data.value?.app.books
// console.log(showBooks)

const CreateBook = gql`
  mutation CreateBook($title: String!) {
    createBook(bookInput: { title: $title }) {
      id
      title
    }
  }
`
// https://www.youtube.com/watch?v=vI-yEjt2Pbs&list=PLC2LZCNWKL9Z0CgtUGaDejThLdi08BTLe&index=4
const createBook = useMutation(CreateBook)
const title = ref("射雕英雄传")
const submit = () => {
  createBook.executeMutation(<CreateBookMutationVariables>{ title: title.value })
}
</script>

<template>
  <h1>入口文件</h1>
  <div v-if="showBooks.fetching.value">Loading...</div>
  <div v-else-if="showBooks.error.value">{{ showBooks.error.value }}</div>
  <div v-else>
    <ul>
      <li v-for="book of showBooks.data.value?.app?.books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
  </div>

  <form @submit.prevent="submit">
    <label for="title">TITLE: </label>
    <input v-model="title" type="text" />
  </form>
</template>
