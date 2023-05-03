import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"
import type { TDocumentDefinitions } from "pdfmake/interfaces"

import { buyerBillingInfo, buyerContact } from "../sheet-data/buyer"
import { contractBody, contractInfo } from "../sheet-data/contract"
import { fonts } from "../pdf/fonts"
import { generateContract } from "../pdf/generateContract"

// @ts-ignore
const printer = new PdfPrinter(fonts)

const docDefinition: TDocumentDefinitions = generateContract(contractInfo, buyerBillingInfo, buyerContact, contractBody)

const pdfDoc = printer.createPdfKitDocument(docDefinition)
const filepath = path.resolve(__dirname, "./basics.pdf")
pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
