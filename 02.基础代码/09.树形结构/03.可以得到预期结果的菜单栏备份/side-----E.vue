<script setup lang="ts">
import { computed, h } from "vue"
import { IMenu } from "../helpers/side-types"
import { preOrder } from "../helpers/use-bst"
import { sideupData } from "@/stores/data/sideup-data"

const menuData = preOrder(sideupData) // 处理菜单数据
console.log(menuData)
const toggle = (item: IMenu) => {
  item.expanded = !item.expanded
}

const childStyles = (parent: IMenu) =>
  computed(() => ({
    display: parent.expanded ? "block" : "none",
  }))

const renderMenu = (menuData: IMenu[]) => {
  return menuData.map((item) => {
    if (item.children) {
      return h("div", { class: "bar", innerHTML: "hello" })
    } else {
      h("div", { class: "bar", innerHTML: "hello" })
    }
  })
}

//
</script>
<template>
  <div class="menu">
    <ul v-for="item in menuData" :key="item.id">
      <li @click="toggle(item)">
        <span>
          {{ item.title }}
          <!-- {{ item.expanded ? "▼" : "▶︎" }} -->
        </span>
        <ul>
          <!-- <li>{{ item.children }}</li> -->
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu ul {
  padding-left: 16px;
  list-style: none;
}
.menu span {
  cursor: pointer;
}
</style>
