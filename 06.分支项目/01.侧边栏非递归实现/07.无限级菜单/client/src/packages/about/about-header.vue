<script setup lang="ts">
// 定义这个组件的一些属性
defineProps<{
  abouts: [
    {
      to?: string
      icon?: string
      title?: string
    }
  ]
}>()
</script>
<template>
  <n-space :size="0">
    <n-button v-for="item in abouts" :key="item" quaternary type="success" size="large" tag="a" :href="item.to">
      <span v-if="item.icon" :class="`iconfont ${item.icon}`" class="pr-1" />
      {{ item.title }}
    </n-button>
  </n-space>
</template>
