import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
// 按需引入组件库 https://www.naiveui.com/zh-CN/light/docs/import-on-demand
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

const config: UserConfig = {
  plugins: [
    vue(),
    Components({
      // 自动引入按需加载 naiveUI 组件库
      dirs: ["src/components", "src/packages"], // 按需加载的文件夹
      resolvers: [NaiveUiResolver()],
      dts: false, // 不用生成 components.d.ts 文件, 也可以指定目录
    }),
  ],
  resolve: {
    alias: {
      scss: path.join(__dirname, "src/scss/"),
    },
  },
  // https://github.com/vitejs/vite/issues/5833
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
}
export default config
