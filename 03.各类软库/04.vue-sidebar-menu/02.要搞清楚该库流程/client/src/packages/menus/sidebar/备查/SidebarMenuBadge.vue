<script setup lang="ts">
import { ItemBadge } from "../types"

defineProps<{
  badge: ItemBadge
}>()
</script>
<template>
  <component
    :is="badge.element ? badge.element : 'span'"
    class="vsm--badge"
    :class="badge.class"
    v-bind="badge.attributes"
  >
    {{ badge.text }}
  </component>
</template>
