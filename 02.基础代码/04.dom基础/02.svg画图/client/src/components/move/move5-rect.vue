<script setup lang="ts">
import { ref, onMounted } from "vue"
const x = ref(50)
const y = 10
const width = 20
const height = 40
const strokeWidth = 1

const useMove = () => {
  let flag = false
  onMounted(() => {
    const oSvg: SVGElement | undefined | null = document.querySelector("#little") as SVGElement

    oSvg.addEventListener("mousedown", (e) => {
      flag = true
      const rect = oSvg.getBoundingClientRect()
      const css = getComputedStyle(oSvg.parentElement!)
      console.log(css.marginLeft)
      console.log(rect)
      const xx = e.clientX - rect.left + parseInt(css.marginLeft)
      // console.log(xx)
      document.addEventListener("mousemove", (e) => {
        const div_left = e.clientX - xx
        if (flag) {
          x.value = div_left
        }
      })
    })

    document.addEventListener("mouseup", () => {
      flag = false
    })
  })
}
useMove()
</script>
<template>
  <svg>
    <g id="little">
      <rect
        ref="el"
        :x="`${x}px`"
        :y="`${y}px`"
        :width="`${width}px`"
        :height="`${height}px`"
        :style="`stroke-width: ${strokeWidth}px`"
      ></rect>
    </g>
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  margin: 20px;
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
#little {
  stroke: green;
  fill: red;
}
</style>
