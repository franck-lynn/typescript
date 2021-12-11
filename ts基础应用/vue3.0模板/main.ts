import { createApp } from 'vue'
import App from './App.vue'
import router from './packages/router'

import VuerComponents from './packages/components'

const app = createApp(App)
app.use(router)

app.use(VuerComponents)

app.mount('#root')