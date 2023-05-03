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