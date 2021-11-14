<template>
    <h1>这是 home 页面</h1>
    <select v-model="locale">
        <option>cn</option>
        <option>en</option>
    </select>
    <p>{{ t("message.hello") }}</p>

    <h2>不用配置, $t 这个已经全局设置好了, 在 i18n/index.ts 文件里</h2>
    <p>{{ t("linked") }}</p>
    <p>{{ t("named", {msg}) }}</p>
</template>

<script lang="ts">
import {useI18n} from "vue-i18n"
import {defineComponent, computed} from "vue"
export default defineComponent({
    name: "home",
    props: {},
    setup() {
        const {t, locale} = useI18n({})
        const msg = computed(() => t("msg"))
        return {t, locale, msg}
    }
})
</script>

<style lang="scss" scoped></style>
