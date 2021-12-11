<template>
    <h1>Hello World</h1>
    <img src="./images/gaoyuanyuan.png" />
    <h4>{{ msg }}</h4>
    <span :title="msg">悬停提示</span> &nbsp;
    <button @click="handleClick">更改seen</button> &nbsp;
    <button @click="reverseMessage">反转消息</button> &nbsp;
    <p v-if="seen">是否显示</p>
    <input v-model="msg" />
    <img :src="imgUrl" alt width="200" height="150" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
// 引入静态资源
import imgUrl from './images/1uiyiy.jpg'
export default defineComponent({
    name: "App",
    props: {},
    setup() {
        const msg = ref("hello vue ")
        const seen = ref(false)
        const handleClick = () => {
            seen.value = !seen.value
        }
        const reverseMessage = () => {
            msg.value = msg.value.split("").reverse().join("")
        }
        return { msg, seen, handleClick, reverseMessage, imgUrl }
    },
})
</script>

<style lang="scss" scoped>
@import url("scss/main.scss");
</style>
