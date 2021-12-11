import { createApp } from "vue"
import App from "./App.vue"
// 对于 index.html 中的 icon 小图标显示采用就可以了
// <link rel="icon" href="./assets/favicon.ico" type="image/x-icon" />
const app = createApp(App)

app.mount("#root")
