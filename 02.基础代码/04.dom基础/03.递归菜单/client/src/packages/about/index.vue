<script setup lang="ts">
type IMenu = {
  name: string
  chileren?: IMenu[]
}
const data: IMenu[] = [
  { name: "菜单1", chileren: [{ name: "menu1-1" }, { name: "menu1-2" }] },
  { name: "菜单2" },
  { name: "菜单3" },
  { name: "菜单4" },
]
</script>
<template>
  <h1>递归菜单</h1>

  <topleft :data="data"></topleft>
</template>

<style scoped>
.center-circle {
  border: 10px solid red;
  stroke: green;
  fill: none;
}
</style>
