import fsPromise from "fs/promises"
import path from "path"
import { pathToFileURL } from "node:url"

/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  index
 * 同步或者异步读取路由(两种模式)
 */

// ! 异步读取文件名称
export const readFilesName = async (dir: string, ignore = ["index.ts"], list: string[] = [], deep = 0) => {
  const files = await fsPromise.readdir(dir)
  for (let i = 0; i < files.length; i++) {
    const stat = await fsPromise.stat(dir + path.sep + files[i])
    if (stat.isDirectory()) {
      // ! 这里也是异步, 要用到 await
      await readFilesName(dir + path.sep + files[i], ignore, list, deep + 1)
    } else {
      if (!deep && ignore && ignore.length > 0 && ignore.indexOf(files[i]) !== -1) continue
      list.push(dir + path.sep + files[i])
    }
  }
  return list
}

// ! 异步动态导入模块, 并将这些模块放在一个数组里面
export const loader = async (
  dir: string,
  pattern = /^.*(?<=\.ts|js)$/,
  ignore = ["index.ts"],
  list: string[] = [],
  deep = 0
) => {
  // 获取文件名
  const files = await readFilesName(dir, ignore, list, deep)

  const resolvers = []
  for (let i = 0; i < files.length; i++) {
    // 用循环 正则的含义与map正好相反
    if (pattern.test(files[i])) {
      const r = await import(pathToFileURL(files[i]).href)
      for (const prop in r) {
        resolvers.push(r[prop])
      }
    }
  }
  return resolvers
}
