<script setup lang="ts">
import { useMessage } from "naive-ui"
const message = useMessage()
const options = [
  {
    label: "滨海湾金沙，新加坡",
    key: "marina bay sands",
  },
  {
    label: "布朗酒店，伦敦",
    key: "brown's hotel, london",
  },
  {
    label: "亚特兰蒂斯巴哈马，拿骚",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "比佛利山庄酒店，洛杉矶",
    key: "the beverly hills hotel, los angeles",
  },
]
const handleSelect = (key: string | number) => {
  message.info(String(key))
}
</script>
<template>
  <h1>使用模板-默认路由</h1>
  <n-dropdown trigger="hover" placement="bottom-start" :options="options" @select="handleSelect">
    <n-button> 找个地方休息 </n-button>
  </n-dropdown>
</template>

<style scoped></style>
