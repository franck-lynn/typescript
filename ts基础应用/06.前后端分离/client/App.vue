<script setup lang="ts">
import { ref, onMounted } from "vue"

const info = ref(null)

onMounted(async () => {
    // console.log("测试一下")
    const response = await fetch("/api/posts", {
        method: "get",
    })
    console.log(response)
    const posts = await response.json()
    console.log("服务器端返回的信息--> ", posts)
    info.value = posts.msg
})
</script>

<template>
    <h1>发送一个get请求</h1>
    {{ info }}
</template>

<style lang="scss">
@import url("scss/main.scss");
</style>
