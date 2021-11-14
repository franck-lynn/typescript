import { createApp } from "vue"
import App from "./App.vue"

import router from './src/router'
// 注册组件
import install from './src/components'
const app = createApp(App)

app.use(router)
// 使用注册组件
app.use(install)

app.mount("#root")
