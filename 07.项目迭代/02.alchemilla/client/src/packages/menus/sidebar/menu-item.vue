<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <li v-for="node in treeNodes" :key="node.id" @click="toggle(node)">
    <div>
      <h1 v-if="node.header">{{ node.header }}</h1>
      <component
        :is="node.href ? 'router-link' : 'span'"
        :to="node.href"
        :style="[`marginLeft: ${node.deep! * 2  }em  `]"
      >
        {{ node.title }}
      </component>
    </div>
    <menu-item ></menu-item> 
  </li>
</template>

<style scoped></style>
