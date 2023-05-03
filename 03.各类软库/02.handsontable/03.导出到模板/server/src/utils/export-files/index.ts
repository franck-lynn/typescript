import { existsSync } from "fs"
import { readdir, readFile, stat, unlink, writeFile } from "fs/promises"
import path from "path"

//! 辅助函数
const export_variables = (file: string) => {
  // 默认导出 export default 是不允许的
  let exports: string[] = []
  // 这只是对于  export interface/const 并且后面有 = 号有效
  const matchEq = file.match(/(?<=^export\s+(const|interface)\s+)\w+\b/gm)
  if (matchEq) {
    exports = matchEq.map((item) => item.replace(/\{|\}/g, ""))
  }
  // 仅对于 export {C, D} 有效
  const matchBracket = file.match(/(?<=^export\s+\{).+(?=\})/gm)
  if (matchBracket) {
    matchBracket.forEach((item) => {
      exports.push(item)
    })
  }
  const matchConstBracket = file.match(/(?<=^export\s+const\s+\{).+(?=\})/gm)
  if (matchConstBracket) {
    matchConstBracket.forEach((item) => {
      exports.push(item)
    })
  }
  return exports
}

// 读取文件并处理后写入目标文件
const _exportFiles = async (from: string, to: string, ignore = "index") => {
  // from 和 to 刚开始时相同的, to 是写入时的目录, 一般是将刚开始时的目录作为
  // 根目录, 递归时 to 目录保持不变.相对目录根据 to 目录获取,
  // 得到的路径 在window 下要改变下 '\'  为 '/'
  const files = await readdir(from, "utf-8")
  for (let i = 0; i < files.length; i++) {
    const statFile = await stat(from + path.sep + files[i])
    if (statFile.isDirectory()) {
      await _exportFiles(from + path.sep + files[i], to, ignore)
      // 最初的路径被改变了, 改成了多了一个下级路径, 所以要再返回上一级
    } else {
      // 排除掉 index 文件
      if (path.basename(files[i]).includes(ignore)) continue
      //! 排除掉 .ts或者js 结尾的文件
      if (/^.*(?<!ts|js)$/.test(path.extname(files[i]))) continue

      const file = await readFile(from + path.sep + files[i], "utf-8")

      // 采用负向后行断言, 行内后面的要匹配, 得到导出的部分
      const exports = export_variables(file)
      // 得到结果像这样: [ 'getUserByEmail', 'getUserByToken' ]

      let exportsObj = null
      if (exports) {
        // 把导入的文件名按照相对路径的样子修改下
        // const filepath = (from + path.sep + files[i]).replace(from, ".").replace(/\\/g, "/").replace(".ts", "")
        const fileRelativePath =
          "./" +
          path
            .relative(to, from + path.sep + files[i])
            .replace(/\\/g, "/")
            .replace(".ts", "")

        // 把每一行的 [] 替换成 {}, 并去掉数组转成字符串前后的空格
        exportsObj = "export { " + exports.toString().trim() + " } from '" + fileRelativePath + "'"

        const indexFile = path.join(to, "index.ts")
        // 空一行
        await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
        await writeFile(indexFile, exportsObj, { flag: "a", encoding: "utf-8" })
        // 再空一行
        await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
      }
    }
  }
}
export const writeFileToTargetIndex = async (targetAbsoluteDir: string, ignore = "index") => {
  // targetAbsoluteDir 要绝对路径
  const indexFile = path.join(targetAbsoluteDir, "index.ts")
  if (existsSync(indexFile)) {
    // 先删除这个文件, 再重新写入
    await unlink(indexFile)
  }
  await writeFile(indexFile, "// 由 scripts/gen-exports 生成的导出文件", { flag: "a", encoding: "utf-8" })
  await _exportFiles(targetAbsoluteDir, targetAbsoluteDir, ignore)
  console.log(`从目录 ${targetAbsoluteDir} 导出模块的 index.ts 文件写入完成 `)
}

// 专门为自定义指令导出写的导出文件函数
const _importFilesAndExportArray = async (
  from: string,
  to: string,
  list: { filename: string; import: string }[] = [],
  ignore = "index"
) => {
  // from 和 to 刚开始时相同的, to 是写入时的目录, 一般是将刚开始时的目录作为
  // 根目录, 递归时 to 目录保持不变.相对目录根据 to 目录获取,
  // 得到的路径 在window 下要改变下 '\'  为 '/'
  const files = await readdir(from, "utf-8")

  for (let i = 0; i < files.length; i++) {
    const statFile = await stat(from + path.sep + files[i])
    if (statFile.isDirectory()) {
      await _importFilesAndExportArray(from + path.sep + files[i], to, list, ignore)
      // 最初的路径被改变了, 改成了多了一个下级路径, 所以要再返回上一级
    } else {
      // 排除掉 index 文件
      if (path.basename(files[i]).includes(ignore)) continue
      //! 排除掉 .ts或者js 结尾的文件
      if (/^.*(?<!ts|js)$/.test(path.extname(files[i]))) continue

      const file = await readFile(from + path.sep + files[i], "utf-8")

      // 采用负向后行断言, 行内后面的要匹配, 得到导出的部分
      const exports = export_variables(file)
      // 得到结果像这样: [ 'getUserByEmail', 'getUserByToken' ]

      let exportsObj = null
      if (exports) {
        // 把导入的文件名按照相对路径的样子修改下
        // const filepath = (from + path.sep + files[i]).replace(from, ".").replace(/\\/g, "/").replace(".ts", "")
        const fileRelativePath =
          "./" +
          path
            .relative(to, from + path.sep + files[i])
            .replace(/\\/g, "/")
            .replace(".ts", "")

        // 把每一行的 [] 替换成 {}, 并去掉数组转成字符串前后的空格
        exportsObj = "import { " + exports.toString().trim() + " } from '" + fileRelativePath + "'"
        const key = path.basename(files[i], ".ts")
        list.push({ filename: key, import: exportsObj })

        // const indexFile = path.join(to, "index.ts")
        // // 空一行
        // await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
        // await writeFile(indexFile, exportsObj, { flag: "a", encoding: "utf-8" })
        // // 再空一行
        // await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
      }
    }
  }
  return list
}

export const writeFileToGqlExtensionsIndex = async (
  targetAbsoluteDir: string,
  list: { filename: string; import: string }[] = [],
  ignore = "index"
) => {
  // targetAbsoluteDir 要绝对路径
  const indexFile = path.join(targetAbsoluteDir, "index.ts")
  if (existsSync(indexFile)) {
    // 先删除这个文件, 再重新写入
    await unlink(indexFile)
  }
  const obj = await _importFilesAndExportArray(targetAbsoluteDir, targetAbsoluteDir, list, ignore)

  const imports = obj.map((item) => item.import)

  await writeFile(indexFile, "// 由 scripts/gen-exports 生成的导出文件", { flag: "a", encoding: "utf-8" })
  await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
  for (let i = 0; i < imports.length; i++) {
    await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
    await writeFile(indexFile, imports[i], { flag: "a", encoding: "utf-8" })
    await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
  }
  const typeDefs = obj.map((item) => {
    const filename = item.filename
    return `${filename}Directive('${filename}').${filename}DirectiveTypeDefs`
  })
  const transformers = obj.map((item) => {
    const filename = item.filename
    return `${filename}Directive('${filename}').${filename}DirectiveTransformer`
  })
  await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
  const directiveTypeDefs = `export const directiveTypeDefs = [${typeDefs.join(", ")}]`
  await writeFile(indexFile, directiveTypeDefs, { flag: "a", encoding: "utf-8" })
  await writeFile(indexFile, "\n", { flag: "a", encoding: "utf-8" })
  const directiveTransformers = `export const directiveTransformers = [${transformers.join(", ")}]`
  await writeFile(indexFile, directiveTransformers, { flag: "a", encoding: "utf-8" })
  console.log(`从目录 ${targetAbsoluteDir} 导出模块的 index.ts 文件写入完成 `)
}
