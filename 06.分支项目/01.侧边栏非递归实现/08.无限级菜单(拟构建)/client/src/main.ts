import { createApp } from "vue"
import { createPinia } from "pinia"

import urql from "@urql/vue"
import client from "./urql"

import router from "./routers"

import App from "./App.vue"

const app = createApp(App)

const pinia = createPinia()

app.use(urql, client)
app.use(router) // ! 路由加载

app.use(pinia)
app.mount("#root")
