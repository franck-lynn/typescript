<script setup lang="ts">
import { gql, useQuery } from "@urql/vue"
import { ref } from "vue"
const skip = ref(0)
const dataInPokemons = await useQuery({
  query: gql`
    query PokemonsQueryDocument($skip: Int!) {
      pokemons(limit: 10, skip: $skip) {
        id
        name
      }
    }
  `,
  variables: { skip },
})
const pokemons = dataInPokemons.data
const nextPage = () => {
  skip.value += 10
}
</script>
<template>
  <div>
    <ul v-if="pokemons">
      <li v-for="pokemon in pokemons.pokemons" :key="pokemon.id">
        {{ pokemon.name }}
      </li>
    </ul>
    <button @click="nextPage">Next Page</button>
  </div>
</template>

<style scoped></style>
