<template>
    <h1>值绑定</h1>
    <div class="demo">
        <input type="radio" id="one" v-model="picked" value="one" />
        <label for="">{{ picked }}</label>
        <input type="radio" id="two" v-model="picked" value="two" />
    </div>

    <input type="checkbox" v-model="toggle" />
    <label>{{ toggle }}</label>
    <br/>
    <br/>
    <select v-model="selected">
        <option value="abc">ABC</option>
    </select>

    <p>选中的值是: {{ selected }}</p>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "binding-value",
    props: {},
    setup() {
        const picked = ref()
        const toggle = ref(false)
        const selected = ref()
        return {picked, toggle, selected}
    }
})
</script>

<style lang="scss" scoped>
.demo {
    font-family: sans-serif;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
}
</style>
