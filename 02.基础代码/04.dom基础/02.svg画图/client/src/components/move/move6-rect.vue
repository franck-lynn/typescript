<script setup lang="ts">
import { ref, onMounted } from "vue"
const x = ref(50)
const y = ref(10)

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
  <div class="box1">
    <svg>
      <g id="little">
        <rect :x="`${x}px`" :y="`${y}px`" width="20px" height="40px" style="stroke-width: 1px" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.box1 {
  width: 400px;
  height: 400px;
  border: 1px solid greenyellow;
}
svg {
  border: 1px solid red;
}
#little {
  stroke: green;
  fill: red;
}
</style>
