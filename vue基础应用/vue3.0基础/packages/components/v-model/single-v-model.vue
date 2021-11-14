<template>
    <h1>单个的 v-model</h1>
    <div id="v-model-basic" class="demo">
        <input v-model="message" placeholder="edit me" />
        <p>Message is: {{ message }}</p>
    </div>

    <h1>多行文本</h1>
    <div class="demo">
        <span>Multiline message is:</span>
        <p style="white-space: pre-line;">{{ msg }}</p>
        <textarea v-model="msg" placeholder="add multiple lines"></textarea>
    </div>

    <h1>复选框</h1>
    <div class="demo">
        <input id="checkbox" v-model="checked" type="checkbox" />
        <label for="checkbox">{{ checked }}</label>
    </div>

    <h1>多复选框</h1>
    <div class="demo">
        <input id="jack" v-model="checkedNames" type="checkbox" value="Jack" />
        <label for="jack">Jack</label>
        <input id="jhon" v-model="checkedNames" type="checkbox" value="jhon" />
        <label for="jhon">Jack</label>
        <br />
        <span>Checked names: {{ checkedNames }}</span>
    </div>

    <h1>单选框</h1>
    <div class="demo">
        <input id="one" v-model="picked" type="radio" value="one" />
        <label for="one">one</label>
        <input id="two" v-model="picked" type="radio" value="two" />
        <label for="two">two</label>
        <br />
        <span>picked: {{ picked }}</span>
    </div>

    <h1>选择框</h1>
    <div class="demo">
        <select v-model="selected">
            <option disabled value="">请选择一个</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
    </div>
    <h1>多选择框</h1>
    <div class="demo">
        <select v-model="multipleSelected" multiple>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ multipleSelected }}</span>
    </div>
</template>

<script lang="ts">
// https://www.vue3js.cn/docs/zh/guide/forms.html
import {defineComponent, ref} from "vue"
export default defineComponent({
    name: "single-v-model",
    props: {},
    setup() {
        const message = ref("")
        const msg = ref("")
        const checked = ref(false)
        const checkedNames = ref([])
        const picked = ref()
        const selected = ref()
        const multipleSelected = ref([])
        return {message, msg, checked, checkedNames, picked, selected, multipleSelected}
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
