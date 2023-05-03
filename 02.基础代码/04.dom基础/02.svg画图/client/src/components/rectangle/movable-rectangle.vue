<script setup lang="ts">
import {} from "vue"
defineProps<{
  size: number
}>()
</script>
<template>
  <svg :width="`${size}px`" :height="`${size}px`">
    <g id="rectangle">
      <rect x="0" y="0" width="20" height="20" />
    </g>
    <use xlink:href="#rectangle" transform="translate(50, 50)" />
  </svg>
</template>

<style scoped>
svg {
  border: 10px solid red;
}
</style>
