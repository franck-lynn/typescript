<script setup lang="ts">
import { computed, onMounted } from "vue"
// 前序遍历
import { preOrder } from "../helpers/pre-order"
// 控制折叠展开
import { toggle /* , isShow, currentId  */ } from "../helpers/toggle"
// 宽窄和宽度
// import { isNarrow, position as x } from "../../../stores/states"
// 数据树
import { sideupMenuData as root } from "../../../stores/data"
// 遍历数据树, 拍平数组
const treeNodes = computed(() => preOrder(root))

// :style="[node.expanded ? { display: 'block' } : { display: 'none' }]"
// :style="[node.deep === 0 ? { display: 'block' } : { display: node.disabled ? 'block' : 'none' }]"
// const isShowed = ref(false)
console.log(treeNodes.value)
// 先加载第1项
onMounted(() => {
  /*  */
})
</script>
<template>
  <ul v-for="node in treeNodes" :key="node.id" class="text-white">
    <li @click="toggle(node)">
      <div v-if="node.deep === 0">
        <h1 v-if="node.header">{{ node.header }}</h1>
        <component
          :is="node.href ? 'router-link' : 'span'"
          :to="node.href"
          :style="[`marginLeft: ${node.deep! * 2  }em  `]"
        >
          {{ node.title }}
        </component>
      </div>
      <ul>
        <li v-for="item in node.children" :key="item.id">
          <div style="marginleft: 20px">
            <component :is="item.href ? 'router-link' : 'span'" :to="item.href"> {{ item.title }} ---AAA </component>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped></style>
