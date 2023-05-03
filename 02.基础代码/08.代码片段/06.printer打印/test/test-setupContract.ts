import path from "path"

import { setupContract } from "../xlsx/setupContract"

import { buyerBillingInfo, buyerContact } from "../sheet-data/buyer"
import { contractBody, contractInfo } from "../sheet-data/contract"

const filepath = path.resolve(__dirname, "./aName.xlsx")

const workbook = setupContract(contractInfo, buyerBillingInfo, buyerContact, contractBody)

workbook.xlsx.writeFile(filepath)
