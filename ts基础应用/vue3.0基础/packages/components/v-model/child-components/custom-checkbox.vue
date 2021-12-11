<template>
    <input id="checkbox" type="checkbox" @change="handleChange" />
</template>

<script lang="ts">
import {defineComponent, nextTick} from "vue"
export default defineComponent({
    name: "custom-checkbox",
    props: {
        modelValue: {type: Boolean,  default: false}
    },
    emits: ["update:modelValue"],
    setup(props, ctx) {
        // console.log("父组件传过来的值: ---> ", props.modelValue)
        const handleChange = async () => {
            await nextTick()
            ctx.emit("update:modelValue", !props.modelValue)
            // console.log("更改父组件中的值: ---> ", props.modelValue)
        }

        return {handleChange}
    }
})
</script>

<style lang="scss" scoped></style>
