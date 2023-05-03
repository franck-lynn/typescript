import { createApp } from "vue"
import router from "./routers"

import urql from "@urql/vue"
import client from "./urql"

import App from "./App.vue"

const app = createApp(App)
app.use(urql, client)
app.use(router) // 路由加载
app.mount("#root")
