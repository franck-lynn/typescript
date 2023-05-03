/**
 * 把
 * from = "../books/test-avatar/xxxx/test-avatar-cropper.vue"
 * 变成
 * to = "test-avatar/xxxx"
 * 这是由于 vite 升级后, import(动态模块) 需要 ../ 或 ./ 开头, 并且要以文件后缀名
 * 作为结尾, 所欲要把文件路径这样转化一下
 * 正则解读:
 * (?<=^" + startWith + ") 以startWith 开头的单元, ?< 后行断言,表示此子表达式满足后再先后匹配
 * (?<folder>.+) 要匹配的单元
 * (?=/[\\w\\d-_]+\\.[\\w\\d]+$) ?= 先行断言, 表示此表达式满足后再向前匹配
 * @param path 要转化的文件路径
 * @param startWith ../yyy 或者 ./ yyy 这样的路径开头要去掉
 * @returns 去掉开头和文件名部分, 只保留中间部分
 */
export const betweenFolder = (path: string, startWith: string) => {
  const reg = new RegExp("(?<=^" + startWith + ")" + "(?<folder>.+)" + "(?=/[\\w\\d-_]+\\.[\\w\\d]+$)")
  const result = path.match(reg)
  return result?.groups?.["folder"]
}

/**
 * 无论是相对路径还是绝对路径, 都可以获取文件路径上的前一个代表父文件夹
 * 例如: F:/src/components/xxx/yyy.vue 或者  ./components/xxx/yyy.vue
 * 正则解读:
 * (?<parent>\\w[.\\w_-]*)" + "(?=/[\\w\\d-_]+\\.[\\w\\d]+$) 这个正则
 * 要从一个整体来看, 后面的单元是代表一个文件的结尾, 前面单元是表示任意
 * 字符但是不包含 /
 * @param path 代表文件夹路径的字符串
 * @returns 父文件夹 parent folder
 */
export const parentFolder = (path: string) => {
  const reg = new RegExp("(?<parent>\\w[.\\w_-]*)" + "(?=/[\\w\\d-_]+\\.[\\w\\d]+$)")
  const result = path.match(reg)
  return result?.groups?.["parent"]
}
