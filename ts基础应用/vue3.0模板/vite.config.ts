// https://www.pipipi.net/vite/config/
// https://vitejs.dev/config/
// vite.config.ts
import path from "path"
import {UserConfig} from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
// import 'vite/client.d'

const config: UserConfig = {
    // mode: "production",
    mode: "development",
    build: {
        // rollupOptions: {
        //     output: {
        //         sourcemap: "hidden"
        //     }
        // }
        sourcemap: "inline"
    },
    resolve: {
        alias: {
            // 别名
            "@": path.resolve(__dirname, "./packages/"),
            "~": "F:/node/node_modules",
            scss: "./packages/scss/",
            typings: "./typings/"
        }
    },

    plugins: [vue()], // vue 的支持
    server: {
        fsServe: {strict: false},
        host: "0.0.0.0",
        port: 8080
    }
}
export default config
// https://www.jianshu.com/p/ee5ec23d4716?utm_campaign=haruki
