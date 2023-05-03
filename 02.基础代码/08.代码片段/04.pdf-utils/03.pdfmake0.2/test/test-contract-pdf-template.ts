import { buyerBillingInfo, buyerContact } from "../data/buyer"
import { contractInfo } from "../data/contract"
// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/
import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"
import type { TDocumentDefinitions } from "pdfmake/interfaces"

import { fonts } from "../helpers"
import { generateContract } from "../helpers/pdf/contract-pdf-template"

// import { headerUp, headerdown } from "../data/table-contract-header"
import { contractBOM } from "../data/table-contract-body"

const filepath = path.resolve(__dirname, "./basics.pdf")

// @ts-ignore
const printer = new PdfPrinter(fonts)

const docDefinition: TDocumentDefinitions = generateContract(
  contractInfo,
  buyerBillingInfo,
  buyerContact,
  // headerUp,
  // headerdown,
  contractBOM
)

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
