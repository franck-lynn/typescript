<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { MenuItem } from "../types"

// const props = withDefaults(defineProps<{ item }>(), {})
const props = defineProps<{
  item: MenuItem
}>()

const attrs = useAttrs()


const isHyperLink = computed(() => {
  return !!(props.item.href || props.item.external)
})
</script>

<template>
  <a v-if="isHyperLink" v-bind="attrs">
    <slot />
  </a>
  <router-link v-else v-slot="{ href, navigate }" :to="[attrs.href]">
    <a v-bind="attrs" :href="href" @click="navigate">
      <slot />
    </a>
  </router-link>
</template>
