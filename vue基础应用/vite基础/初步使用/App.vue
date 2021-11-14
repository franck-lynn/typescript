<script setup lang="ts">
// https://v3.cn.vuejs.org/guide/typescript-support.html#%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA
// https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-%E5%92%8C-defineemits
// 导入 setup 语法糖组件不需要注册声明, 直接在视图中使用即可
// vue 文件的结构发生改变, ts 默认放到页面顶部, 视图在中间
// 导入 vue 文件必须写上后缀名 .vue, 否则 ts 无法识别 vue 文件
import HelloWorld from "./components/HelloWorld.vue"
import { ref, onMounted } from "vue"
// 引入静态资源
import imgUrl from "./images/1uiyiy.jpg"
const props = defineProps({
    title: { type: String, default: () => "测试信息" },
})
console.log(props.title)
//! 也作为父组件的值, 通过属性传给子组件
const msg = ref("hello vue ")
const seen = ref(false)
const handleClick = () => {
    seen.value = !seen.value
}
const reverseMessage = () => {
    msg.value = msg.value.split("").reverse().join("")
}

//! 父组件收到消息后响

const handleChange = (param: string) => {
    console.log(param)
}

//! 父组件调用子组件暴露的属性
const propsEmitRef = ref()
//! 在生命周期钩子里调用子组件暴露的属性和方法
onMounted(() => {
    console.log(propsEmitRef.value.child)
    console.log(propsEmitRef.value.childNode())
})
</script>

<template>
    <h1>Hello World</h1>
    <img src="./images/gaoyuanyuan.png" />
    <h4>{{ msg }}</h4>
    <span :title="msg">悬停提示</span> &nbsp;
    
    
    <button @click="handleClick">更改seen</button>
    &nbsp;
    <button @click="reverseMessage">反转消息</button>
    &nbsp;
    <p v-if="seen">是否显示</p>
    <input v-model="msg" />
    <img :src="imgUrl" alt width="200" height="150" />
    <hello-world ref="propsEmitRef" :msg="msg" @on-change="handleChange"></hello-world>
</template>

<style lang="scss" scoped>
@import url("scss/main.scss");
</style>
