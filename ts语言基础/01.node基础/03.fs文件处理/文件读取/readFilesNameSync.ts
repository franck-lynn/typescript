/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  readFilesNameSync
 * 递归同步读取文件名
 */
import fs from "fs"
import path from "path"

const readFilesNameSync = (dir: string, ignore?: string[] | null, list: string[] = [], deep = 0) => {
    // 读取第1层文件或文件夹路径, 得到的是一个路径数组
    const files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        // 所以, 遍历读取到的路径数组, 判读是文件名还是文件目录?
        // 读取的路径信息
        const stat = fs.statSync(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            // 如果是文件路径, 递归读取
            readFilesNameSync(dir + path.sep + files[i], ignore, list, deep + 1)
        } else {
            // 如果是文件名, 就走这里
            // 忽略掉第1层的要忽略的文件, 如不需要这个功能, 去掉 deep 即可
            // 是第1层级, 就是只有第1层级的文件名可以忽略掉, deep = 0 转化为 false
            // 并且要忽略的数组存在, 数组的长度 > 0, 并且 忽略的这个文件名在指定忽略数组里面进行忽略
            if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}

export { readFilesNameSync }
