<script setup lang="ts">
import {} from "vue"
import { data, options } from "./chart-config"
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>
<template>
  <div class="bar">
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped>
.bar {
  width: 600px;
  height: 400px;
}
</style>
