<script setup lang="ts">
import { ref } from "vue"
import json from "../data/state_capitals.json"
const data = json
const search = ref("")
</script>
<template>
  <!-- <simple-autocomplete /> -->
  <!-- 进阶自动补全 -->
  <typeahead v-model="search" :data="data" />
  <small>You selected: {{ search }}</small>
</template>

<style scoped>
.center-circle {
  border: 10px solid red;
  stroke: green;
  fill: none;
}
</style>
