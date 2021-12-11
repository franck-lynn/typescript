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
    server: {
        host: "0.0.0.0",
        port: 8080,
        // 解决跨域请求的问题
        proxy: {
            // 当这样配置时, 就连 / 的请求都转发了, vite下index.html 入口
            // 文件找不到.
            // "/":{
            //     target: "http://localhost:3000/",
            //     secure: false,
            //     changeOrigin: true,
            // }
            "/api":{
                // 这样配置时, 等于客户端请求要加上一个 /api, 
                // 而且也能找到 index.html 文件了, 真正做到了前后端分离
                target: "http://localhost:3000/",
                // secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        cors: true, // 默认允许跨域
    },
    
}
export default config
