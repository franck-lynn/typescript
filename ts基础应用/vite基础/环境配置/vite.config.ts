import path from "path"
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件

const mode = process.env.MODE || "devlopment"
console.log("vite的环境变量---> ", mode)

const config: UserConfig = {
    mode,
    // 默认的静态文件位置, 配不配值这个 public 文件夹下的文件都能访问到
    // publicDir: './public',
    base: path.resolve(__dirname, './dist'),
    // cacheDir: "node_modules/.vite", //缓存位置, 默认是 node_modules/.vite
    build: {
        // 生产构建时的选项
        // https://cn.vitejs.dev/config/#build-target
        // target: "modules", // 构建目标, 默认就是 modules
        outDir: path.resolve(__dirname, './dist'), // 构建时输出的路径, 相对于 项目的根目录
        // 指定生成静态资源的存放路径（相对于 build.outDir）
        // 构建时静态文件输出的路径, 默认就是 assets
        assetsDir: "assets", 
    },

    plugins: [vue()],
}

export default config
