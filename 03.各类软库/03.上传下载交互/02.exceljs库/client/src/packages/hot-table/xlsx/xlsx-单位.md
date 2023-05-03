# excel 中的单位

1. 工作表设置

```ts
pageSetUp: {
  paperSize: 9,  // horizontalCentered: true 
  orientation: "portrait", //  竖向进纸
  horizontalCentered: true // 水平居中
}
```

2. 页边距及页眉页脚

```ts
// 单位设置为 mm, excel 使用的是 cm, 在 exceljs 使用的是英寸
// 所以 pageSetup.margins 中使用英寸为单位
// 窄边距时:
const MARGIN_LR = 6 // mm, 左右的边距
const MARGIN_TD = 16 // mm, 包含页眉页脚的上下边距
const MARGIN_HF = 5 // mm 页眉页脚高度

function mm2Inch(value: number){
  return value / 25.4
}

pageSetup.margins {
  left: mm2Inch(MARGIN_LR), // 左边距
  right: mm2Inch(MARGIN_LR), // 右边距
  top: mm2Inch(MARGIN_TD), // 上边距
  bottom: mm2Inch(MARGIN_TD), // 下边距
  header: mm2Inch(MARGIN_HF), // 页眉
  footer: mm2Inch(MARGIN_HF) // 页脚
}
```

3. 行高

```ts
// 在 excel 中, 行高单位是 磅, 1mm = 2.86 磅, 
// 以 mm 为单位,
const ROW_1 = 3 // mm

function mm2Pound (value: number){
    return value * 2.86 
}

const ROWS_HEIGHT = [
    {1: mm2Pound(ROW_1)}
]
```

4. 列宽

```ts
// 在 excel 中, 列宽单位是 1/10 inch, 即 1 单位=2.54 mm
// 以 mm 为单位, 则 1mm = 1/ 2.54 单位
// 在 exceljs 中, 与 excel 中单位相同, 
// 列宽实际宽度还要减去细线 1.5磅 = 0.3527mm, 
// 例如, 我要设置列宽 10mm, 则在 excelJS中, 设置值为 10 / 2.54
// 实际在 excel 中, 列宽显示为: 10 / 2.54 - 2* 0.3527 

const WIDTH_A = 10 // mm

function mm2DeciInch (value: number){
    return value / 2.54
}

const COLUMNS_WIDTH = [
    {A: mm2DeciInch(WIDTH_A)}
]
```

5. 表格的设计

```ts
// 数字转字母的函数
function numberToLetters(num: number) {
  let letters = ""
  while (num >= 0) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters
    num = Math.floor(num / 26) - 1
  }
  return letters
}

console.log(numberToLetters(27))

// 表格头
const TABLE_HEADERS =  [
    {title: "序号", col: "A", width:10, visible: true, colSpan: true, rowSpan: false},
    {title: "名称", col: "A", width:10,  checked: true, visible: true},
    {title: "订货号", col: "A", width:10,  checked: true, visible: true},
    {title: "型号及材质", col: "A", width:10,  checked: true, visible: true},
    {title: "数量", col: "A", width:10,  checked: true, visible: true},
    {title: "单价", col: "A", width:10,  checked: true, visible: true},
    {title: "总价", col: "A", width:10,  checked: true, visible: true},
    {title: "品牌", col: "A", width:10,  checked: true, visible: true},
    {title: "编码", col: "A", width:10,  checked: true, visible: true},
    {title: "备注", col: "A", width:10,  checked: true, visible: true},
]
// 根据表格的长度, 获取要合并的最后一个单元格
const LAST_COLUMN = numberToLetters(headers.length - 1)

const TABLE_START_ROW = 10 // 表格开始行, 用于solSpan 
const TABLE_END_ROW = 11 // 表格结束行



// 根据表头进行设置 
for(let i= 0; i< TABLE_HEADERS.length; i++){
    // 第1列就是A  
    const cellProperties = TABLE_HEADERS[i]
    
    const cellName = numberToLetters(i)
    // 合并单元格行. i列: 从开始行到结束行, 
    if(cellProperties.rowSpan){
        worksheet.mergeCell(`${cellName}${TABLE_START_ROW}:${cellName}${TABLE_END_ROW}`)
    }
    // 合并单元格列: 第i列到第 i + 1列, 合并的是结束行 
    if(cellProperties.colSpan){
        worksheet.mergeCell(`${cellName}${TABLE_END_ROW}:${cellName+1}${TABLE_END_ROW}`)
    }
    // 获取对应的单元格
    const cell = worksheet.getCell(`${cellName}${TABLE_START_ROW}`)
    // 设置单元格样式和值
    cell.style = { font: { bold: true }, alignment: { horizontal: "center", vertical: "middle" } }
    cell.value = cellProperties.title
}
```

