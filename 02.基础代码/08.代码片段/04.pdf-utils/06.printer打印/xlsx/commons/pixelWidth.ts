/* 
 exceljs 里行高和列宽单位 是 px
 在 exceljs 中 假设设置为 J, 则在 excel 显示为 E
 E = 72 / dpi * J
 J = dpi / 72 * E
*/
const dpi = 96
export const px = 72 / dpi
