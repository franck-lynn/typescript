import { contractBOM } from "../data/table-contract-body"
import { generateTableBody } from "../helpers"

const tc = generateTableBody(contractBOM)

console.log(tc)
