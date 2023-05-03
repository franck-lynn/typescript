/**
 * 类似于 nodejs 中的 path.base(), 后缀名区分大小写
 * @param filepath
 * @param ext : 后缀名
 * @returns 文件名字符串
 */
export const basename = (filepath: string, ext?: string) => {
  const suffix = ext ? ext : ""
  const reg = new RegExp("(?<filename>[^\\\\/]+)" + suffix + "$", "i")
  const result = filepath.match(reg)

  return result?.groups?.["filename"]
}
