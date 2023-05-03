/**
 * 类似于 nodejs 中的 path.base(), 后缀名区分大小写
 * @param filepath
 * @param ext : 后缀名
 * @returns 文件名字符串
 */
export const basename = (filepath: string, ext?: string) => {
  // 判断 filepath, ext 是不是字符串, 错误代码抛出时要指出
  // 错误的名称, 类型和值, 以便跟踪, 例如:
  /* 
    const validateString = (value, name) => {
        if(typeof value !== 'string'){
            throw new ERR_INVALIDA_ARG_TYPE(name, 'string', value)
        }
    } 
    */
  // ext 是否存在, 如果存在, 检查 ext 是否由字符或者数字组成, 这2项都满足,
  // 才进入下一个正则.
  // /^\.[\w\d]+$/ // 以点. 号开头, 有字幕或者数字组成的字符串才有可能是后缀名.
  // 不符合这个要求的直接丢弃
  // const suffix = ext &&  /^\.[\w\d]+$/.test(ext) ? ext : ""
  // 或者这样判断, ext 存在吗? 是符合后缀名规则吗?
  const suffix = ext ? ext : ""
  // ([^\\/]+) // 不是 \ 或者 \\  或者 / 结尾的, 适用于不同的平台
  const reg = new RegExp("(?<filename>[^\\\\/]+)" + suffix + "$", "i")
  const result = filepath.match(reg)
  return result?.groups?.filename
}
