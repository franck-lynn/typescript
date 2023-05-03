<script setup lang="ts">
import { onMounted } from "vue"
const useMove = () => {
  let flag = false
  onMounted(() => {
    const odiv = document.querySelector("#box1") as HTMLElement
    odiv.addEventListener("mousedown", (e) => {
      flag = true
      const x = e.offsetX
      const y = e.offsetY
      // console.log("监听", x, y)
      document.addEventListener("mousemove", (e) => {
        // 窗口总高度 - 小方块高度 = 上方留白的总高度
        const _h = window.innerHeight - odiv.offsetHeight
        const _w = window.innerWidth - odiv.offsetWidth

        let div_left = e.clientX - x
        let div_top = e.clientY - y
        // 当方块上移时, div_top 会越来越小, 直到为负数, 这时候取 0, 此时 _h 不变
        // 当方块下移时, div_top 会越来越大, 直到与h值相等,这是取 div_top, 此时_h不变
        div_top = Math.min(Math.max(0, div_top), _h)
        div_left = Math.min(Math.max(0, div_left), _w)

        if (flag) {
          odiv.style.top = div_top + "px"
          odiv.style.left = div_left + "px"
        }
      })
    })
    odiv.addEventListener("mouseup", () => {
      flag = false
    })
  })
}
useMove()
</script>
<template>
  <div id="box1"></div>
</template>

<style scoped>
div {
  position: absolute;
  top: 300px;
  left: 500px;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: red;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 70%);
}
</style>
