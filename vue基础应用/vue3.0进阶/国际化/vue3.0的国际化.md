# vue3.0 的国际化

vue3.0 

```sh
> 国际化
│  App.vue // 入口 .vue 文件, 有一个路由出口
│  index.html       
│  main.ts // 主文件
│  package.json     
│  tsconfig.json    
│  vite.config.ts   
│  vue3.0的国际化.md
│  
├─components        
│      home.vue //  从路由出口出, 有 locale, t 等函数   
│      
├─i18n
│      cn.json
│      cn.json5
│      en.json
│      en.json5
│      index.ts // 国际化的全局配置
│
├─router
│      index.ts // 设置路由
│
└─typings
        json.d.ts
        vue-shim.d.ts
        vue-test-utils.d.ts

```

在 main.提示文件中, 使用 i18n

```vue
import {i18n} from './i18n'
// ...
app.use(i18n)
```

在 /i18n/index.ts 中, 进行 i18n 的配置, 关键是配置一个 语言的对象和设置语言的区域, 然后导出给 app.use() 使用就可以了


```ts
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
```

而在 一般的 vue 文件中, 导入

```vue
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
```

就可以使用国际化