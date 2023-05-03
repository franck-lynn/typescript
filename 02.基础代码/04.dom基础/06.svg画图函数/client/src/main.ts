import { createApp } from "vue"
import router from "./routers"

import App from "./App.vue"
const app = createApp(App)

app.use(router) // ! 路由加载
app.mount("#root")
