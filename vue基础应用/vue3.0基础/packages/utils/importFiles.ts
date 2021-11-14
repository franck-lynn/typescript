// 1. /packages/utils/index.ts,  // 生成路由用
// 2. /packages/components/index.ts, // 注册组件用
// 3. /App.vue // 生成链接用
// 这3个文件用到这个函数

import { FileType } from "../../typings"
// 读取 components 目录及其子目录下所有的 .vue 文件
const files: Record<string, FileType> = import.meta.globEager("../components/**/*.vue")
export { files }
