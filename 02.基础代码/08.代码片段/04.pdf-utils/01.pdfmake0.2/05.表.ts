// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/
import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"

import { fonts } from "./fonts-setting"
import {
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

// @ts-ignore
const docDefinition: PdfPrinter.TDocumentDefinitions = {
  defaultStyle: { font: "SimSum", fontSize: TABLE_BODY_FONTSIZE },
  styles: {
    tableHeader: { font: "msyh", bold: true },
    subTableHeader: { font: "msyh", bold: true, fontSize: SUB_TABLE_HEADER_FONTSIZE },
  },

  content: [
    {
      layout: "lightHorizontalLines", // optional
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers

      table: {
        headerRows: 2,
        // 数字设置的是固定列宽,
        // star 表示填充剩余空间, 如果多余一个 star, 平均分配剩余空间
        // auto 表示根据内容决定长度
        widths: [16, 60, 120, "auto", "auto", "auto", 40, "auto"],
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
              border: [false, false, false, false],
              style: "tableHeader",
            },
            {
              text: "备注",
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              border: [false, false, false, false],
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
            { text: "", border: [false, false, false, false] },
            { text: "", border: [false, false, false, false] },
          ],
          // 数据列与表头的最多列要一样
          [
            { text: 1, alignment: "center" },
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
        ],
      },
    },
  ],
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
