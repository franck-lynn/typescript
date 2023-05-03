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


