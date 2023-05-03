import { not, isEmpty, mergeDeepRight } from "ramda"
import { Style } from "exceljs"

import { OptionXlsxStyles, XlsxContent } from "../../types"

export function getStyles(item: XlsxContent, optionStyles: OptionXlsxStyles) {
  let selfStyles = item.style

  const defaultStyle = optionStyles.defaultStyle
  const styles = optionStyles.styles
  // 没有设置 style, 就设置为默认的样式并返回
  if (!selfStyles && defaultStyle) {
    // 这是不存在 style 属性时, 设置一个默认的, 默认的也不存在, 就为空
    selfStyles = defaultStyle
    return selfStyles // ! 还要返回的
  }

  // selfStyles 存在, 当且仅当为字符串时
  if (typeof selfStyles === "string") {
    if (styles && styles[selfStyles]) {
      // styles 里面有 selfStyle 定义了的, 就用这个
      selfStyles = styles[selfStyles]
    } else {
      selfStyles = {} // 这里需要返回一个空的对象, 因为单元格不接受字符串
    }
  }

  // 再看看 defaultStyle 是否存在
  if (defaultStyle && selfStyles) {
    selfStyles = mergeDeepRight(defaultStyle, selfStyles) as Partial<Style>
  }
  if (not(isEmpty(selfStyles))) return selfStyles
}
