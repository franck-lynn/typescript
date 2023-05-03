/**
 * 数字转字母的函数
 * @param num
 * @returns
 */
export function numberToLetters(num: number) {
  let letters = ""
  while (num >= 0) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters
    num = Math.floor(num / 26) - 1
  }
  return letters
}

/**
 * 列 实际值 + 0.78 = 显示单位
 * @param value
 * @returns
 * 假如按如下设置列:
 * [4.5,  16,   26,    7,    10,    12,    7,       14] = 96.5 +  8* 0.78单位
 * [9.1,  32.6, 52.9, 14.2,  20.3,  24.3 , 14.2, 30.1 ] = 197.7
 * A4 纸宽 210 - 边距 12 = 198
 * 如果设置成毫米数, 大致上输入值 / 2.0275 的样子得到毫米数的列宽
 */
export function convertColumnToMM(value: number) {
  return value / 2.0275
}
/* 
// https://www.bilibili.com/video/BV1u84y1K7wv/?spm_id_from=333.337.search-card.all.click&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// 对象的 interator 接口, 用于遍历对象
export function makeIterator<T extends object>(obj: T) {
  obj[Symbol.iterator] = () => {
    const self = <T>this
    const keys = Reflect.ownKeys(self)
    let index = 0
    return {
      next() {
        if (index > keys.length - 1) {
          return { done: false, index, value: undefined }
        }
        return { done: true, index, value: self[keys[index++]] }
      },
    }
  }
}
 */
