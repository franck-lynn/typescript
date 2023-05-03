<script setup lang="ts">
import { onMounted } from "vue"
onMounted(() => {
  const box1 = document.querySelector(".box1") as HTMLElement
  // console.log(box1)
  const rect = box1.getBoundingClientRect()
  console.log(rect.left, rect.top)
  // const style = getComputedStyle(box1)
  // console.log(style.top) // auto
  const box2 = document.querySelector(".box2") as HTMLElement
  // console.log(box1)
  // 获取的坐标是相对于浏览器左上角的绝对坐标
  const rect2 = box2.getBoundingClientRect()
  console.log(rect2.left, rect2.top)
})
</script>
<template>
  <div class="box1">
    <div class="box2"></div>
  </div>
</template>

<style scoped>
.box1 {
  margin: 20px;
  width: 300px;
  height: 300px;
  border: 10px solid red;
}
.box2 {
  margin-top: 40px;
  margin-left: 60px;
  width: 80px;
  height: 80px;
  border: 10px solid yellowgreen;
}
</style>
