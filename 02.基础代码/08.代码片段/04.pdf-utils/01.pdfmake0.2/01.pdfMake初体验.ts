// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/

import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"

const filepath = path.resolve(__dirname, "./basics.pdf")

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

const docDefinition = {
  content: [
    "First paragraph",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
  ],
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
