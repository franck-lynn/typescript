import cn from "./cn.json"
import en from "./en.json"
import {createI18n} from "vue-i18n"

const messages = {
    cn,
    en
}

const i18n = createI18n({
    legacy: false, // you must set `false`, to use Compostion API
    // 设置全局属性, 并使用 $t 翻译而不是 t,  这样就可以不必在每个组件中导入
    // const { t } = useI18n() 之类的了, 官方建议还是采用
    // 更改为setup使用useI18nwithuseScope: 'global'选项返回的安装上下文的属性或功能
    globalInjection: true,
    locale: "cn", // 设置地区
    fallbackLocale: "en", // set fallback locale
    messages
})

export {i18n}
// 开发环境下警告:
// vue-i18n.esm-bundler.js:46 You are running the esm-bundler build of vue-i18n.
// It is recommended to configure your bundler to explicitly replace feature flag
// globals with boolean literals to get proper tree-shaking in the final bundle.
// 解决方案:
// https://stackoverflow.com/questions/66140411/you-are-running-the-esm-bundler-build-of-vue-i18n-it-is-recommended-to-configur
// https://github.com/xiaoxian521/vue-pure-admin/commit/f2db3acee2629ec26bc531a5b0b4be9eaec14dab
//! import { createI18n } from 'vue-i18n/index', 这样导入即可
