// 表格的一些常量
/**
 * 表头行高, 2行时表头行高设置 =8, 表头总高度 2 * 8 = 16
 */
export const TABLE_HEADER_HEIGHT = 8 //

/**
 * 表格体的高度, 即数据单元格高度 = 11
 */
export const TABLE_HEIGHT = 11

/**
 * 表头标题的字体 12号
 */
export const TABLE_HEADER_FONTSIZE = 12 // 表头字体, 稍微大一点
/**
 * (有跨列)表头第1行和第2行字体高 8, 比2行合并的行高小 4
 */
export const SUB_TABLE_HEADER_FONTSIZE = 8 // 表头第2行字体, 第1行如果没被跨行, 也是这个高度
/**
 * 表格中字体高
 */
export const TABLE_BODY_FONTSIZE = 10 // 表体字体

/**
 * 表头字体垂直居中, 相对位置移动 = 行高 -(行高 -2 -字高 / 2) = 2 + 字高 / 2
 * 仅为表头设置的近似垂直居中
 */
export const TABLE_HEADER_MIDDLE = { x: 0, y: TABLE_HEADER_HEIGHT / 2 }

// 表格字体居中, 用行高 = 字高 进行代替(需要每行都要设置, 麻烦弃用)
// export const TABLE_BODY_MIDDLE = { x: 0, y: TABLE_HEIGHT - SUB_TABLE_HEADER_FONTSIZE / 2 }
/**
 * 标题栏行的 margin = 2
 */
export const ROW_MARGIN = 2
