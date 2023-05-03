// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/
import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"

const filepath = path.resolve(__dirname, "./basics.pdf")
// 后端是可以操作文件的
// 需要字体拷贝
const fonts = {
  Roboto: {
    normal: path.resolve(__dirname, "../fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.resolve(__dirname, "../fonts/Roboto/Roboto-Medium.ttf"),
    italics: path.resolve(__dirname, "../fonts/Roboto/Roboto-Italic.ttf"),
    bolditalics: path.resolve(__dirname, "../fonts/Roboto/Roboto-MediumItalic.ttf"),
  },
}

const printer = new PdfPrinter(fonts)

// @ts-ignore
const docDefinition: PdfPrinter.TDocumentDefinitions = {
  pageMargins: [40, 40, 40, 100],
  footer: function (currentPage: number, pageCount: number) {
    // 页脚的设置
    return {
      table: {
        body: [
          //
          [
            {
              text: `page ${currentPage} of ${pageCount}`,
              aligment: "right", //
              style: "normalText",
              margin: [0, 20, 50, 0],
            },
          ],
        ],
      },
      // 取消边框在 table 的同级
      layout: "noBorders",
    }
  },
  content: [
    // pageBreak: after 表示分页
    { text: "First page of Documeny", pageBreak: "after" }, //
    { text: "Second page of Document", pageBreak: "after" },
    { text: "Third page of Document", pageBreak: "after" },
    // 最后一行不用分页
    { text: "Fourth page of Document" },
  ],
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
