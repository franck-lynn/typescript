<template>
    <h1>组件中的v-model, 多个属性</h1>
    <!-- 这是父组件, 使用了子组件, 父组件中使用 v-model -->
    <custom-input v-model:name="name" v-model:age="age"></custom-input>
    <p>父组件中输入的值: {{ name }} --- {{ age }}</p>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "component-v-models",
    // 这里创建了一个子组件
    components: {
        "custom-input": {
            props: {
                name: {type: String},
                age: {type: String}
            },
            // 多个属性, 父组件上该怎么使用还是怎么使用, 父组件只是表达传递数据之意
            // 子组件上 :value 绑定属性名称, update:属性名 发射更改给父组件
            // 总结起来, 使用方法就是: 父组件 v-model: 属性名, 传数据
            //                          子组件 :value=属性名, update:属性名改数据
            template: `
                <input :value="name" @input="$emit('update:name', $event.target.value)"/>
                <input :value="age" @input="$emit('update:age', $event.target.value)"/>
            `
        }
    },
    props: {},

    setup() {
        const name = ref()
        const age = ref()
        return {name, age}
    }
})
</script>

<style lang="scss" scoped></style>
