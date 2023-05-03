<script setup lang="ts">
// 这个组件是 给 test-index.vue 使用的
</script>
<template>
  <header class="header">
    <div class="top-navigation">
      <slot name="top-nav"></slot>
    </div>
  </header>

  <section class="main-container">
    <slot name="main-container"></slot>
  </section>

  <footer class="sticky-footer">
    <sticky-footer></sticky-footer>
  </footer>
</template>

<style scoped>
/* @import url("scss/global.css");
@import url("scss/main.css"); */
.header {
  z-index: 10;
  display: flex;
  width: 100%;
  height: var(--height-top-nav);
  background-color: #eeeeee;
  & .top-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 2px; /* 多增加一个 div, 左右两侧菜单不至于完全靠边 */
    width: 100%;
    height: 100%;
  }
}
.main-container {
  width: 100%; /* .main-container 不要设置为弹性布局 */
  height: calc(100% - var(--height-top-nav) - var(--height-global-footer));
  overflow: auto;
}
.sticky-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: var(--height-global-footer);
}
</style>
