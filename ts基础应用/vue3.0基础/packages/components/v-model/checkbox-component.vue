<template>
    <h1>组件中使用checkbox的v-model</h1>
    <custom-checkbox v-model="picked"> </custom-checkbox>
    {{ picked }}
</template>
 
<script lang='ts'>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'checkbox-component',
        props: { 
        },
        setup(){
            const picked = ref(false)
            return { picked }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>