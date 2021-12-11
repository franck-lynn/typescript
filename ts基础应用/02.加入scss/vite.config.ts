// 对于 index.html 中的 icon 小图标显示采用就可以了
// <link rel="icon" href="./assets/favicon.ico" type="image/x-icon" />
import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件
const config: UserConfig = {  
    plugins: [vue()]
}
export default config
