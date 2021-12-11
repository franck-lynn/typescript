<template>
    <h1>组件中的v-model</h1>
    <!-- 这是父组件, 使用了子组件, 父组件中使用 v-model -->
    <custom-input v-model="searchText"></custom-input>
    <p>父组件中输入的值: {{ searchText }}</p>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "component-v-model",
     // 这里创建了一个子组件
     components: {
        "custom-input": {
            props: {
                modelValue: {type: String}
            },
            // 子组件 value 绑定了一个属性 modelValue, 子组件发射更改消息给父组件, 
            // 让父组件更改值, 子组件不能擅自更改
            template: `<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>`
        }
    },
    props: {},
   
    setup() {
        const searchText = ref()
        return {searchText}
    }
})
</script>

<style lang="scss" scoped></style>
