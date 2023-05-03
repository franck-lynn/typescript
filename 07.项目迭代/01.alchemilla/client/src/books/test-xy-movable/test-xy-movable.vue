<script setup lang="ts">
import { ref } from "vue"
// import { useDraggable } from "@vueuse/core"
import { useXYMovable } from "../../packages/layout/units-layout/xy-mavable/useXYMovable"

const el = ref()

const { x, y } = useXYMovable(el, { initialValue: { x: 100, y: 100 } })
// const { x, y } = useDraggable(el, { initialValue: { x: 100, y: 100 } })
</script>
<template>
  <h1>XY可移动</h1>
  <div ref="el" :style="`left: ${x}px; top: ${y}px`" class="move">x: {{ Math.ceil(x) }}, y: {{ Math.ceil(y) }}</div>
</template>

<style scoped>
.move {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: red;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 70%);
}
</style>
