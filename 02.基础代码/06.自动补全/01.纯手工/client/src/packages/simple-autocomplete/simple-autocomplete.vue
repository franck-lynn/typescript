<script setup lang="ts">
// 模拟数据来源
// https://gist.github.com/bradtraversy/20dee7787486d10db3bd1f55fae5fdf4
// 教程网址
// https://www.youtube.com/watch?v=1iysNUrI3lw&t=644
// https://github.com/Constructor-io/constructorio-ui-autocomplete
// https://constructor-io.github.io/constructorio-ui-autocomplete/?path=/docs/autocomplete-component--docs
// https://github.com/autocompletejs/autocomplete.js
// 一个较小的插件
// https://github.com/kraaden/autocomplete
// https://jsbin.com/cuyamokeki/edit?html,js,output
// 星多的一个插件, 但是需要 id
// https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-core/createAutocomplete/
// "@tarekraafat/autocomplete.js": "^10.2.7",
// 采用这个插件
// "autocompleter": "^8.0.3"
import { ref /* , onMounted */ } from "vue"
import json from "../data/state_capitals.json"

const value = ref<string>("")
const search = ref()
const matchList = ref<HTMLDivElement>()

type State = {
  abbr: string
  name: string
  capital: string
  lat: string
  long: string
}
// onMounted(() => {
//   const s: HTMLInputElement = search.value
//   const m: HTMLDivElement = matchList.value
// })

async function handleInput() {
  // console.log("输入框触发", value.value)
  // vite 的静态资源是放在 public 目录下的
  // const res = await fetch("./state_capitals.json")
  // const states: State[] = await res.json()
  const states: State[] = json
  // console.log(states)
  // get Matches
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${value.value}`, "gi")
    return state.name.match(regex) || state.abbr.match(regex)
  })
  if (value.value.length === 0) {
    matches = []
    matchList.value!.innerHTML = ""
  }

  outputHtml(matches) // 输出到 HTML
}
function outputHtml(matches: State[]) {
  if (matches.length > 0) {
    const html = matches
      .map((match) => {
        return `<div>
          <h4> ${match.name} -- ${match.abbr} </h4>
          <span> ${match.capital} </span>
        </div>`
      })
      .join("")
    matchList.value!.innerHTML = html
    // console.log(html)
  } else {
    matchList.value!.innerHTML = ""
  }
}
</script>
<template>
  <div style="width: 400px">
    <n-space vertical>
      <n-input id="search" ref="search" v-model:value="value" type="text" placeholder="请输入" @input="handleInput" />
    </n-space>
    <div id="match-list" ref="matchList"></div>
  </div>
</template>

<style scoped></style>
