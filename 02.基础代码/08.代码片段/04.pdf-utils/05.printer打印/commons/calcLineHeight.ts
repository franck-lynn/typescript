import { pt } from "../xlsx/commons/pixelWidth"

export function calcLineHeight(s: string, colWidth: number, fontSize: number, bodyRowHeight: number): number {
  let width = 0
  for (let i = 0; i < s.length; i++) {
    const charCode = s.charCodeAt(i)
    if (charCode > 127) {
      // 中文字符的Unicode码大于127
      width += fontSize // 中文字符的宽度等于字体大小
    } else {
      width += fontSize / 2 // 假设英文字符的宽度为中文字符的一半
    }
  }
  /* 
   ! 总字符宽度 / 列宽 = 行数,  ! 行数 * 行高 = 总行高
   ! 行高, 列宽获取的是单位是 points(磅),  字符宽度是 pixel,  字体高度 是 pixel
   ! 统一转换成 pixel 单位, 因为设置时采用的是 pixel, 获取的时候是 points(磅) 
  */
  const lines = Math.ceil(width / (colWidth * pt))

  return lines * bodyRowHeight
}

// 得到一个字符串码点的真实长度
export function strLen(s: string): number {
  let length = 0
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127) {
      length += 2
    } else {
      length += 1
    }
  }
  return length
}
