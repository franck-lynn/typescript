<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <h1>vite 静态资源</h1>
  <pre>
    这个代码颜色是在global.css 中定义的, 
    如果能显示出来, 表面该css 文件导入了
  </pre>
  <sticky-footer></sticky-footer>
</template>

<style scoped>
@import url("./scss/global.css");
@import url("scss/main.css");

@font-face {
  font-family: yyg;
  src: url("./scss/my-font/叶根友毛笔行书.ttf") format("opentype");
  font-display: auto;
}
h1 {
  font-size: 2.5rem;
  font-family: yyg;
}
</style>
