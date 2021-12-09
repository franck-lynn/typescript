/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  dynamicImport
 * 动态的文件导入
 */
import { readFilesNameSync, readFilesName } from "./readFilesName"

// 动态导入模块, 并将这些模块放在一个数组里面
const dynamicImportSync = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = readFilesNameSync(dir, ignore, list, deep)
    // console.log(files)
    return files.map((filename: string) => {
        // console.log(filename)
        // 如果不是 ts 或者 js 文件就返回
        if (/^.*(?<!\.ts|js)$/.test(filename)) return
        // console.log(filename)
        // const rs = await import("./index")
        // 返回 Promise 数组
        return import(filename)
    })
}

// const filesSync = dynamicImportSync(__dirname)
// filesSync.map(filename => {
//     filename!.then((v) =>{
//         console.log(v)
//     })
// })


const dynamicImport = async(dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 获取文件名
    const files = await readFilesName(dir, ignore, list, deep)
    console.log(files)
}

const files = dynamicImport(__dirname)