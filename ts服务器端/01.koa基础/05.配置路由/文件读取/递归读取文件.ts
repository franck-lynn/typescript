import fs from "fs"
import path from "path"

const readdir = (dir: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        return fs.readdir(dir, "utf-8", (error, data) => {
            if (error) return reject(error)
            resolve(data)
        })
    })
}

const readStat = (dir: string): Promise<fs.Stats> => {
    return new Promise((resolve, reject) => {
        return fs.stat(dir, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

const readFilesName = async (dir: string, ignore: string | null = null, list: string[] = [], deep = 0) => {
    // 读取文件目录
    const files = await readdir(dir)
    for (let i = 0; i < files.length; i++) {
        const stat = await readStat(dir + path.sep + files[i])
        if (stat.isDirectory()) {
            readFilesName(dir + path.sep + files[i], ignore, list, deep + 1)
        } else {
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}
// console.log(readFilesName(__dirname, null, ["index.ts"]))
readFilesName(__dirname, null, ["index.ts"]).then((v) => console.log(v))