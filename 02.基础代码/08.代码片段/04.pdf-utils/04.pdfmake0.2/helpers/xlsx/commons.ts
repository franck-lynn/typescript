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
