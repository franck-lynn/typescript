import { createApp } from "vue"

import urql from "@urql/vue"
import client from "./urql"

import App from "./App.vue"

const app = createApp(App)
app.use(urql, client)

app.mount("#root")
