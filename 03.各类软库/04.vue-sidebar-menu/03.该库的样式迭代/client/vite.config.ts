import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
// https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
import postcssPresetEnv from "postcss-preset-env"

import postcssMixins from "postcss-mixins"
// https://www.npmjs.com/package/unplugin-auto-import
// 不需要 import {ref, onMounted} 就可以直接使用的插件
import AutoImport from "unplugin-auto-import/vite"
// 按需引入组件库 https://www.naiveui.com/zh-CN/light/docs/import-on-demand
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import dotenv from "dotenv"
// ******************* 环境变量 *************************
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
// console.log("加载环境变量===> ", process.cwd()) // 这里 cwd 是可以加载的
// 通过下面这样可以指定环境变量文件的位置, 前后端都在同一个环境变量
let envs: dotenv.DotenvConfigOutput

process.env.NODE_ENV === "production"

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

// ******************* 环境变量 *************************
const config: UserConfig = {
  plugins: [
    vue(),
    Components({
      // 自动引入按需加载 naiveUI 组件库
      dirs: ["src/components", "src/packages"], // 按需加载的文件夹
      resolvers: [NaiveUiResolver()],
      dts: false, // 不用生成 components.d.ts 文件, 也可以指定目录
    }),
    // 不需要自动导入这个功能, 改为手动导入, 因为会有重复导入的警告
    AutoImport({
      // https://github.com/antfu/unplugin-auto-import#configurations
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        "vue",
        "vue-router",
        {
          "@vueuse/core": [
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
        },
      ],
      cache: false,
      //   dirs: ["./src/packages/**", "./src/components/**"],
      dts: "./src/typings/auto-imports.d.ts",
    }),
  ],

  css: {
    postcss: {
      plugins: [
        // https://github.com/postcss/postcss-mixins
        // 使用自定义的 mixins ,
        postcssMixins(),
        // 这是 postcss-preset-env 预设的最新的地址
        // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
        postcssPresetEnv({
          // 列表选项
          // https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
          stage: 0,
          // 要这样配置浏览器前缀才能生效
          autoprefixer: { grid: true, overrideBrowserslist: ["> 1%", "last 2 versions"] },
          browsers: "defaults",
        }),
        
      ],
    },
  },

  resolve: {
    alias: {
      typings: path.join(__dirname, "src/typings/"),
      "@": path.join(__dirname, "src"),
      // "~/": "F:/node/node_modules/", post css 用这个不行
      components: path.join(__dirname, "src/components"),
      packages: path.join(__dirname, "./src/packages"),
      scss: path.join(__dirname, "src/scss/"),
      // 解决这个警告: vue-i18n.esm-bundler.js:46 You are running the esm-bundler build of vue-i18n.
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  // https://github.com/vitejs/vite/issues/5833
  server: {
    host: "0.0.0.0",
    port: 8080,
    // 解决跨域请求的问题
    proxy: {
      "/api": {
        // 这样配置时, 等于客户端请求要加上一个 /api,
        // 而且也能找到 index.html 文件了, 真正做到了前后端分离
        target: "http://localhost:3000/",
        // secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors: true, // 默认允许跨域
  },
  define: {
    "process.env": process.env,
  },
}
export default config
