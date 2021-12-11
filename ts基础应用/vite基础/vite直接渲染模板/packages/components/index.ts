// 注册组件
// 一次性注册组件
import type { App as Application } from 'vue'
import { files } from "@/utils"


// import { FileType } from 'typings'
// interface FileType {
//     [key: string]: Component
// }
// 读取 components 文件夹下的文件
// const files:Record<string, FileType> = import.meta.globEager('../components/**/*.vue')

// console.log(files)


// main.ts 中安装这些组件
const install = (app: Application): void => {

    Object.keys(files).forEach((c: string) => {
        const component = files[c]?.default
        // 挂载全局控件
        app.component(component.name as string, component)
    })
}

export default install