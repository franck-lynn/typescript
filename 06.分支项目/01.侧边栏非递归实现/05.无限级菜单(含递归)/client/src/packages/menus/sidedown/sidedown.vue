<script setup lang="ts">
import { IMenu } from "../helpers/side-types"

import { traverseTree } from "../helpers/sidedown-helper"

// import SideItem from "./side-item.vue"

const props = withDefaults(
  defineProps<{
    items: IMenu[] | null
  }>(),
  {}
)
const treeData = traverseTree(props.items!)
</script>
<template>
  <side-item :items="treeData"></side-item>
</template>
