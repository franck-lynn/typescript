<script setup lang="ts">
import { IMenu } from "../helpers/side-types"

import { traverseTree } from "../helpers/topleft-helper"

const props = withDefaults(
  defineProps<{
    items: IMenu[] | null
  }>(),
  {}
)
const treeData = traverseTree(props.items!)
</script>
<template>
  <top-left-item :items="treeData"></top-left-item>
</template>
