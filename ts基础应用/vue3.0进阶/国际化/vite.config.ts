// https://www.pipipi.net/vite/config/
// https://vitejs.dev/config/
// vite.config.ts
import path from "path"
import {UserConfig} from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
// import 'vite/client.d'

const config: UserConfig = {
    resolve: {
        alias: {
            // 别名
            "@": path.resolve(__dirname, "./packages/"),
            "~": "F:/node/node_modules",
            scss: "./packages/scss/",
            typings: "./typings/"
        }
    },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: "import '~compass-mixins/lib/compass'"
    //         }
    //     }
    // },
    plugins: [
        vue(), // vue 的支持
    ],

    server: {
        fsServe: {strict: false},
        host: "0.0.0.0",
        port: 8080
    }
}
export default config
// 找不到“typings”的类型定义文件。
//   The file is in the program because:
//     Entry point of type library 'typings' specified in compilerOptions