import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件

const config: UserConfig = {
  plugins: [vue()],
  // https://github.com/vitejs/vite/issues/5833
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
}
export default config
