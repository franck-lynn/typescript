<script setup lang="ts">
import { onMounted } from "vue"
type IMenu = {
  name: string
  chileren?: IMenu[]
}
defineProps<{
  data: IMenu[]
}>()

onMounted(() => {
  const oLi = document.querySelector("li") as HTMLElement
  console.log("判断是不是当前点击? ", oLi)
})
</script>
<template>
  <ul>
    <li v-for="item in data" :key="item.name">
      <span>{{ item.name }}</span>
      <topleft v-if="item.chileren" :data="item.chileren"></topleft>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
}
</style>
