<script setup lang="ts">
import { ref, onMounted } from "vue"
const props = defineProps<{
  size: number
  strokeWidth: number
}>()

const useSize = () => {
  const centerPosition = ref(0)
  const radius = ref(0)
  onMounted(() => {
    const svgElement = document.querySelector("svg") as SVGSVGElement
    const svgCss = getComputedStyle(svgElement)
    const borderWidth = parseInt(svgCss.borderWidth)
    // 求出圆心位置
    centerPosition.value = (props.size - 2 * borderWidth) / 2
    // 求出圆的半径
    radius.value = (props.size - props.strokeWidth) / 2 - borderWidth
  })

  return { centerPosition, radius }
}
const { centerPosition, radius } = useSize()
</script>
<template>
  <svg :width="`${size}px`" :height="`${size}px`">
    <g id="center-circle">
      <circle
        id="gauge-circle"
        :cx="`${centerPosition}px`"
        :cy="`${centerPosition}px`"
        :r="`${radius}px`"
        :style="`stroke-width: ${strokeWidth}px`"
      ></circle>
    </g>
  </svg>
</template>

<style scoped>
/* 
svg {
  border: 1px solid red;
}
#center-circle {
  stroke: green;
  fill: none;
} 
*/
</style>
