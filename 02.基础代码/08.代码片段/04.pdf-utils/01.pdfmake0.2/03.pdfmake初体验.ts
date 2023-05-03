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
  content: [
    { text: `this is a header ${Math.random() * 100}`, style: "header" }, //
    "No styling here, this is a  standard paragraph",
    { text: "Another text", style: "anotherStyle" },
    { text: "multiple style applied", style: ["header", "AnotherStyle"] },
  ],
  styles: {
    header: { fontSize: "22", bold: true },
    anotherStyle: { header: { fontSize: 22, bolder: true } },
  },
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
