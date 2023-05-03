import type { OmitColSpanRowType, OmitColumnnRowType } from "./types"
import { quotationTableHeader, TOTAL_QUOTATION_COLUMNS } from "./data-table"

// 测试单个行数据
export const myCompany: OmitColumnnRowType[] = [
  {
    name: "杭州德美瑞数控工具有限公司",
    colSpan: quotationTableHeader.length,
    style: {
      font: { name: "微软雅黑", size: 20, bold: true },
      alignment: { vertical: "middle", horizontal: "center" },
    },
  },
]
// 测试多行数据合并单元格情况, 要有 colSpan 属性
export const quotation_sheet_header: OmitColumnnRowType[][] = [
  [
    {
      name: "杭州德美瑞数控工具有限公司",
      colSpan: TOTAL_QUOTATION_COLUMNS,
      style: {
        font: { name: "微软雅黑", size: 20, bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      },
    },
  ],
  [
    {
      name: "Hangzhou Demry NC Tooling Co.,Ltd",
      colSpan: TOTAL_QUOTATION_COLUMNS,
      style: {
        font: { name: "Arial Black", size: 10, bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      },
    },
  ],
  [
    {
      name: "杭州市西湖科技园振华路200号瑞鼎大厦B616  电话:0571-87830396 传真:0571-87830397",
      colSpan: TOTAL_QUOTATION_COLUMNS,
      style: {
        font: { name: "Arial Black", size: 10, bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      },
    },
  ],
  [
    {
      name: "报价单",
      colSpan: TOTAL_QUOTATION_COLUMNS,
      style: {
        font: { name: "Arial Black", size: 18, bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      },
    },
  ],
]

// 测试多行数据不合并的单元格情况, 要有 column 属性, 没有按序插入 <Omit<RowType, "colSpan">
// 没有指定 column 属性时, 默认是从 A 列开始的
export const quation_sheet_neck: OmitColSpanRowType[][] = [
  [{ name: `客  户: 杭州新宇机械有限公司` }], //
  [
    { name: `联系人: 刘总`, column: "A" },
    { name: `编  号: BJHZLRY230312-000309`, column: "D" },
  ],
  [
    { name: `电  话: 13958160001`, column: "A" },
    { name: `日  期: 2023-03-12 15:35:21`, column: "D" },
  ],
  [
    { name: `IM联系: wechat: 手机同号`, column: "A" },
    { name: `发件人: 袁会芳`, column: "D" },
  ],
]
