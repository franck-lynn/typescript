// https://github.com/Sandwych/rmb_converter/blob/master/src/js/rmb_convert.js
export default function (money: number) {
  const cnyDigits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
  const sectionChars = ["", "拾", "佰", "仟", "万"]
  const parseDecimal = (sb: string[], integerPart: number, decPart: number, zeroCount: number) => {
    // 小数部分大于0小于99
    // assert(decPart > 0 && decPart <= 99) 例如, 小数部分96
    const jiao = Math.floor(decPart / 10) // 角取整
    const fen = decPart % 10 // 分取整
    if (zeroCount > 0 && (jiao > 0 || fen > 0) && integerPart > 0) {
      sb.push("零")
    }
    if (jiao > 0) {
      sb.push(cnyDigits[jiao])
      sb.push("角")
    }
    if (zeroCount == 0 && jiao == 0 && fen > 0 && integerPart > 0) {
      sb.push("零")
    }
    if (fen > 0) {
      sb.push(cnyDigits[fen])
      sb.push("分")
    } else {
      sb.push("整")
    }
  }
  const parseInteger = (sb: string[], integer: number, isFirstSection: boolean, zeroCount: number) => {
    // assert(integer > 0 && integer <= 9999)
    const nDigits = Math.floor(Math.log(integer + 0.5) / Math.log(10)) + 1
    if (!isFirstSection && integer < 1000) {
      zeroCount++
    }
    for (var i = 0; i < nDigits; i++) {
      var factor = Math.floor(Math.pow(10, nDigits - 1 - i))
      var digit = Math.floor(integer / factor)

      if (digit != 0) {
        if (zeroCount > 0) {
          sb.push("零")
        }
        sb.push(cnyDigits[digit])
        sb.push(sectionChars[nDigits - i - 1])
        zeroCount = 0
      } else {
        zeroCount++
      }
      integer -= Math.floor(integer / factor) * factor
    }
    return zeroCount
  }
  const toUpper = (money: number) => {
    const sb: string[] = []
    const integerPart = Math.trunc(money)
    const wanyiPart = Math.trunc(integerPart / 1000000000000)
    const yiPart = (integerPart % 1000000000000) / 100000000
    const wanPart = Math.trunc((integerPart % 100000000) / 10000)
    const qianPart = integerPart % 10000
    const decPart = Math.round((money * 100) % 100)

    var zeroCount = 0

    if (integerPart >= 10000000000000) {
      return "超出最大处理长度"
    }
    //处理万亿以上的部分
    if (integerPart >= 1000000000000 && wanyiPart > 0) {
      zeroCount = parseInteger(sb, wanyiPart, true, zeroCount)
      sb.push("万亿")
    }
    //处理亿到千亿的部分
    if (integerPart >= 100000000 && yiPart > 0) {
      var isFirstSection = integerPart >= 100000000 && integerPart < 1000000000000
      zeroCount = parseInteger(sb, yiPart, isFirstSection, zeroCount)
      sb.push("亿")
    }
    //处理万的部分
    if (integerPart >= 10000 && wanPart > 0) {
      var isFirstSection = integerPart >= 1000 && integerPart < 10000000
      zeroCount = parseInteger(sb, wanPart, isFirstSection, zeroCount)
      sb.push("万")
    }
    //处理千及以后的部分
    if (qianPart > 0) {
      var isFirstSection = integerPart < 1000
      zeroCount = parseInteger(sb, qianPart, isFirstSection, zeroCount)
    } else {
      zeroCount += 1
    }

    if (integerPart > 0) {
      sb.push("元")
    }
    //处理小数
    if (decPart > 0) {
      parseDecimal(sb, integerPart, decPart, zeroCount)
    } else if (decPart <= 0 && integerPart > 0) {
      sb.push("整")
    } else {
      sb.push("零元整")
    }

    return sb.join("")
  }
  return toUpper(money)
}
