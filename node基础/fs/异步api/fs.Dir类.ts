import fs from "fs"
// import { opendir} from 'fs/promises'
// 读取目录的条目
// 这是 异步api
fs.opendir("./", (err, dir) => {
    // 获取的是一个dir对象
    const folder: string[] = []
    // 这里需要同步的才可以, 用一个立即执行函数
    ;(function iterator(i) {
        dir.read((err, dirent) => {
            if (!dirent) {
                console.log(folder)
                return
            }else{
                folder.push(dirent!.name)
                iterator(i+1)
            }
        })
    })(0)
})

// 这是 promise api
// (async () => {
//     try {
//         // 目录类的一个实例
//         const dir = await opendir('./')
//         // 遍历出这个目录下的文件
//         for await (const dirent of dir){
//             console.log(dirent.name)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })()
