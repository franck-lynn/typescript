// 获取文件后缀名
export const extname = (filepath: string) => {
  const ext = filepath.match(/.+(?<extname>\.[\w\d\s]*)$/)
  return ext?.groups?.["extname"]
}
