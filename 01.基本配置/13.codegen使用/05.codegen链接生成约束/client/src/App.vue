<script setup lang="ts">
import PokemonList from "./components/PokemonList.vue"
import {} from "vue"
</script>
<template>
  <Suspense>
    <template #default> <PokemonList /> </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style scoped></style>
