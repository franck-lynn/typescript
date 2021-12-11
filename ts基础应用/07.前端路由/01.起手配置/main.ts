import { createApp } from "vue"
import App from "./App.vue"
// 1. 导入路由配置
import router from './src/router'

const app = createApp(App)
// 2. 应用路由
app.use(router)

app.mount("#root")
