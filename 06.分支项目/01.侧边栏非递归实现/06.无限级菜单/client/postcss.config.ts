// postcss.config.ts
// https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env

import postcssPresetEnv from "postcss-preset-env"
import postcssMixins from "postcss-mixins"
import tailwindcss from "tailwindcss"
// 直接导入不行, 得用  plugins 里得 require() 语法, 用 import() 也不行
// import tailwindcssNesting from "tailwindcss/nesting"

const cwd = process.cwd()

export default {
  plugins: [
    // tailwindcssNesting(),
    require("tailwindcss/nesting"),
    postcssPresetEnv({
      // 列表选项
      // https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
      stage: 0,
      // 要这样配置浏览器前缀才能生效
      autoprefixer: { grid: true, overrideBrowserslist: ["> 1%", "last 2 versions"] },
      browsers: "defaults",
    }),
    postcssMixins(),
    tailwindcss({
      // darkMode: "class",
      content: cwd.includes("client")
        ? ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]
        : ["./client/index.html", "./client/src/**/*.{vue,js,ts,jsx,tsx}"],

      theme: {
        extend: {},
      },
      // variants: {
      //   enxtend: {
      //     backgroundColor: ["dark"],
      //     textColor: ["dark"],
      //   },
      // },
      // plugins: [(await import("tailwindcss-dark-mode"))()],
    }),
  ],
}
