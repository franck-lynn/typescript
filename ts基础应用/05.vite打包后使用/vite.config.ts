// 对于 index.html 中的 icon 小图标显示采用就可以了
// <link rel="icon" href="./assets/favicon.ico" type="image/x-icon" />
import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
import babel from "@rollup/plugin-babel"


const mode = process.env.MODE || "devlopment"
console.log("vite的环境变量---> ", mode)

const config: UserConfig = {
    mode,
    // base: mode === 'devlopment' ? '/' : path.resolve(__dirname, "./dist"),
    build: {
        // 生产构建时的选项
        // 打包的路径, 指的是将js, css, ico 等这些文件打包到 dist 目录下 static 路径
        // dist 是默认的打包路径----> 参考 01. 注释
        assetsDir: "./static", 
        rollupOptions: {
            // 以项目根目录下的 index.html 作为入口文件
            input: { 
                main: path.resolve(__dirname, "index.html"), 
            },
            output: {
                //01. 可以在这里配置打包的路径
                dir: path.resolve(__dirname, "server"),
            },
            plugins: [
                babel({
                    presets: ["@babel/preset-env"],
                    babelHelpers: "bundled",
                }),
            ]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./packages/"),
            "~": "F:/node/node_modules",
            scss: "./scss",
            typings: "./typings", 
        }
    }, 
    plugins: [vue()],
}
export default config
