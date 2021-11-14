import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件

// import vueRollupPlugin from "rollup-plugin-vue"
// import typescript from "rollup-plugin-typescript2"
// import typescript from '@rollup/plugin-typescript'

// import replace from "@rollup/plugin-replace"
// import { nodeResolve } from "@rollup/plugin-node-resolve"
// import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"

const mode = process.env.MODE || 'devlopment'
console.log("vite的环境变量---> ", mode)

const config: UserConfig = {
    mode,
    build: {
        // 生产构建时的选项
        assetsDir: './static', // 打包的路径
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"), // 以项目根目录下的 index.html 作为入口文件
            },
            // output: {
            //     dir: path.resolve(__dirname, "dist"),
            //     format: "iife",
            //     globals: {vue: 'Vue'}
            // },
            // external: ['vue'], 
            plugins: [
                // vueRollupPlugin(),
                // replace({
                //     preventAssignment: true,
                //     "process.env.NODE_ENV": JSON.stringify("development"),
                //     // vue3.0 rc-3 以后, 推荐显式注明构建模式, 这里是开发时的配置, 生成模式重新配置
                //     __VUE_OPTIONS_API__: false,
                //     __VUE_PROD_DEVTOOLS__: true,
                //     // 显式指定 i18n 构建配置
                //     __VUE_I18N_FULL_INSTALL__: true,
                //     __VUE_I18N_LEGACY_API__: true,
                //     __INTLIFY_PROD_DEVTOOLS__: false,
                // }),
                // nodeResolve({ browser: true }),
                babel({
                    presets: ["@babel/preset-env"],
                    babelHelpers: "bundled",
                }),
                // commonjs(),
            ],
        },
        // watch: {
        //     // 文件变化时重新构建
        //     // https://rollupjs.org/guide/en/#watch-options
        // },
        // sourcemap: "inline",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./packages/"),
            "~": "F:/node/node_modules",
            scss: "./scss",
            typings: "./typings",
        },
    },
    plugins: [vue()],
    // server: {
    //     host: "0.0.0.0",
    //     port: 8080,
    // },
}

export default config
