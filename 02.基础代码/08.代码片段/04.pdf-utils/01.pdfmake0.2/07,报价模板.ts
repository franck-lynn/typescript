// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/
import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"
import type { TDocumentDefinitions, ContentTable, Content } from "pdfmake/interfaces"

import { fonts } from "./fonts-setting"

import {
  ROW_MARGIN,
  SUB_TABLE_HEADER_FONTSIZE,
  TABLE_BODY_FONTSIZE,
  TABLE_HEADER_HEIGHT,
  TABLE_HEADER_MIDDLE,
  TABLE_HEIGHT,
} from "./table-constants"

const filepath = path.resolve(__dirname, "./basics.pdf")
// 后端是可以操作文件的
// 需要字体拷贝

// @ts-ignore
const printer = new PdfPrinter(fonts)

const docDefinition: TDocumentDefinitions = {
  defaultStyle: { font: "SimSum", fontSize: TABLE_BODY_FONTSIZE },
  styles: {
    tableHeader: { font: "msyh", bold: true },
    subTableHeader: { font: "msyh", bold: true, fontSize: SUB_TABLE_HEADER_FONTSIZE },
  },

  content: [
    {
      text: "杭州德美瑞数控工具有限公司",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 20, margin: [0, 2] },
    },
    {
      text: "Hangzhou Demry NC Tooling Co.,Ltd",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 10, margin: [0, 2] },
    },
    {
      text: "杭州市西湖科技园振华路200号瑞鼎大厦B616  电话:0571-87830396 传真:0571-87830397",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 10, margin: [0, 2] },
    },
    {
      text: "报价单",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 18 },
    },

    {
      margin: [0, ROW_MARGIN],
      columns: [
        { text: "客  户: 杭州新宇机械有限公司" }, //
      ],
    },
    {
      alignment: "justify",
      margin: [0, ROW_MARGIN],
      columns: [{ text: "联系人: 王总" }, { text: "编  号: BJHZLRY230312-000309" }],
    },
    {
      alignment: "justify",
      margin: [0, ROW_MARGIN],
      columns: [{ text: "电  话: 13958160001" }, { text: "日  期: 2023-03-12 15:35:21" }],
    },
    {
      alignment: "justify",
      margin: [0, ROW_MARGIN],
      columns: [{ text: "IM联系: wechat: 手机同号" }, { text: "发件人: 袁会芳" }],
    },

    {
      text: " ", // 空行设置
      style: { alignment: "center", fontSize: 6 },
    },
    {
      layout: {
        hLineWidth: (rowIndex: number, node: ContentTable) => {
          if (rowIndex === 0 || rowIndex === 2 || rowIndex === node.table.body.length - 3) return 2
          if (rowIndex < node.table.body.length - 2 || rowIndex === node.table.body.length) return 1
          return 0
        },
        vLineWidth: () => 0,
        hLineColor: () => "gray",
      },
      margin: [0, 0, 0, 8], // 让报价条款和说明下移一点, 整个表格设置 margin
      table: {
        headerRows: 2,
        // 数字设置的是固定列宽,
        // star 表示填充剩余空间, 如果多余一个 star, 平均分配剩余空间
        // auto 表示根据内容决定长度
        widths: [16, 60, 120, "auto", "auto", "auto", 40, "auto"],
        // widths: [16, 60, 100, 40, 40, 50, 40, "auto"],
        // heights: 14.25,
        heights: function (row: number) {
          if (row === 0 || row === 1) {
            return TABLE_HEADER_HEIGHT
          }
          return TABLE_HEIGHT
        },

        body: [
          [
            {
              text: "序号",
              rowSpan: 2, // 跨行, 2行的数据长度要一样, 下一行的数据为 ""
              alignment: "center", // 水平居中
              // 假设字体高度 10, 移动到半个字体高度差不多就居中对齐了
              style: "tableHeader",
            },
            {
              text: "名称",
              rowSpan: 2,
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            {
              text: "型号及材质",
              rowSpan: 2,
              alignment: "center",
              // relativePosition: { x: 0, y: 14.25 - 10 / 2 },
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            {
              text: "数量",
              rowSpan: 2,
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            { text: "单价", alignment: "center", style: "subTableHeader" },
            { text: "总价", alignment: "center", style: "subTableHeader" },
            {
              text: "品牌",
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              border: [true, true, false, false],
              style: "tableHeader",
            },
            {
              text: "备注",
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              border: [true, true, false, false],
              style: "tableHeader",
            },
          ],
          // 第2行列数仍然要和第1行一样, 被跨的列数据为空
          [
            "",
            "",
            "",
            "",
            { text: "人民币含税", colSpan: 2, alignment: "center", style: "subTableHeader" },
            "",
            // 跨列后要在后面的列的边框都去掉才好看一些, 上下2行对应的边框都要去掉
            { text: "", border: [false, false] },
            { text: "", border: [false, false] },
          ],
          // 数据列与表头的最多列要一样
          [
            { text: 1, alignment: "center" /* margin: [0, 1] 设置可以垂直居中 */ },
            "美夹新倍比高精度弹簧筒夹刀柄",
            "BBT30-MEGA6N-60-L",
            "20000",
            "8888.88",
            "88888.88",
            { text: "大昭和精", alignment: "center" },
            "这是进口高精度的筒夹刀柄",
          ],
          [{ text: 20, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 40, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 60, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [
            { text: 80, alignment: "center" },
            "铣刀",
            "2JJB 004 008 S04 0.2R X 0.4,L1=,L2=0.8,L=40,d=4",
            "50",
            "371.55",
            "18577.5",
            { text: "韩国匠精", alignment: "center" },
            "用于淬火材料加工",
          ],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],

          [
            "",
            "",
            "",
            {
              text: "汇总: ",
              colSpan: 2,

              style: {
                alignment: "right",
              },
            },
            "",
            {
              text: "88888.88",
            },
            "",
            "",
          ],
          [
            "",
            "",
            "",
            {
              text: "13%增值税:",
              colSpan: 2,
              alignment: "right",
            },
            "",
            { text: "88888.88" },
            "",
            "",
          ],
          ["", "", "", { text: "价税合计:", colSpan: 2, alignment: "right" }, "", { text: "88888.88" }, "", ""],
        ],
      },
    },
    {
      text: "报价条款和说明: 本报价30天有效",
      margin: [0, ROW_MARGIN * 2],
    },
  ],
  // 设置页脚
  footer: (currentPage: number, pageCount: number /* , pageSize: ContextPageSize */): Content => {
    return {
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            { text: "杭州德美瑞数控工具有限公司", margin: [30, ROW_MARGIN] },
            {
              text: `第 ${currentPage} 页, 共 ${pageCount}页`,

              style: { alignment: "right" },
              margin: [30, ROW_MARGIN],
            },
          ],
        ],
      },
      // 取消边框在 table 的同级
      layout: "noBorders",
    }
  },
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
