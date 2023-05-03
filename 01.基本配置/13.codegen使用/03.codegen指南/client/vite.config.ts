import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
// 按需引入组件库 https://www.naiveui.com/zh-CN/light/docs/import-on-demand
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

import dotenv from "dotenv"
// ******************* 环境变量 *************************
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
// console.log("加载环境变量===> ", process.cwd()) // 这里 cwd 是可以加载的
// 通过下面这样可以指定环境变量文件的位置, 前后端都在同一个环境变量
let envs: dotenv.DotenvConfigOutput
try {
  if (process.cwd().includes("client")) {
    // 表示在 client 下启动 package.json,  向上一级查找, 在项目的根目录下 .env 文件
    envs = dotenv.config({ path: "../.env" })
  } else {
    envs = dotenv.config({ path: "./.env" })
  }
  for (const key in envs.parsed) {
    // https://blog.csdn.net/m0_67393593/article/details/123398483
    process.env[key] = envs.parsed[key]
  }
} catch (e) {
  console.error(e)
}

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
      "@": path.join(__dirname, "src"),
      scss: path.join(__dirname, "src/scss/"),
    },
  },
  // https://github.com/vitejs/vite/issues/5833
  server: {
    host: "0.0.0.0",
    port: 8080,
  },

  define: {
    "process.env": process.env,
  },
}
export default config
