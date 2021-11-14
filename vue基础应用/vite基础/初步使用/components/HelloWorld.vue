<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from "vue"
const props = defineProps({
    msg: { type: String, default: () => "默认值" },
})
const emit = defineEmits(["on-change"])
const handleClick = () => {
    // 子组件向父组件发送消息
    emit("on-change", "父组件方法被调用了")
}
defineExpose({
    child: "我是暴露的子组件属性",
    childNode: () => '子组件方法暴露出去并被调用'
})
//! 定义数据
const count = ref(0)
const user = reactive({ name: '张三' })
const arr = reactive([111, 222, 333])
const increment = () => {
    count.value++
    user.name = '李四'
}

watchEffect(() => {
    console.log("监听到count数据的变化---> ", count.value)
})
// 页面加载完成旧执行监听
// watch( [count, user ],  (newDate, oldData) => {
//     console.log(`新数据---> ${newDate[0]} | {newDate[1].name}, 旧的数据---> ${oldData[0]} | ${oldData[1].name}` )
// })
watch( count,  (newDate, oldData) => {
    console.log(`新数据---> ${newDate}, 旧的数据---> ${oldData}` )
}, {
    deep: true,
    immediate: true
})

</script>
<template>
    <p>{{ props.msg }}</p>
    <button @click="handleClick">点击调用父组件方法</button>
    <p>{{ count }} {{ user.name }}</p>
    <p v-for="(item, index) in arr" :key="index">{{ item }}</p>
    <button @click="increment">add 1</button>
</template>

<style lang="scss" scoped>
</style>
