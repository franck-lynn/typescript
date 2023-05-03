<script setup lang="ts">
import { ref, onMounted } from "vue"
const xx = ref(100)
const yy = ref(100)

type Point = {
  x: number
  y: number
}

const moved = (p1: Point, dx: number, dy: number) => ({
  x: p1.x + dx,
  y: p1.y + dy,
})

onMounted(() => {
  const box1 = document.querySelector(".move") as HTMLElement
  let moving = false

  box1.addEventListener("mousedown", (e) => {
    moving = true
    const a = e.clientX
    const b = e.clientY
    const { left, top } = box1.getBoundingClientRect()
    console.log(left, top)
    // 要平移的点
    const p1 = { x: left, y: top }
    document.addEventListener("mousemove", (e) => {
      const dx = e.clientX - a
      const dy = e.clientY - b
      if (moving) {
        const { x, y } = moved(p1, dx, dy)
        xx.value = x
        yy.value = y
      }
    })
    document.addEventListener("mouseup", () => {
      moving = false
    })
  })
})
</script>
<template>
  <div class="box1">
    <div ref="el" :style="`left: ${xx}px; top: ${yy}px`" class="move"></div>
  </div>
</template>

<style scoped>
.box1 {
  margin: 80px;
  width: 600px;
  height: 600px;
  border: 5px solid greenyellow;
}
.move {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: red;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 70%);
}
</style>
