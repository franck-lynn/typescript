import { has, reduce, mergeDeepRight, findIndex, prop, propEq } from "ramda"
const tableBody = [
  {
    item_no: 1,
    name: "美夹新倍比高精度弹簧夹头",
    catalog_number: "BBT30-MEGA6N-60",
    qty: 1,
    price: 1,
    amount: 1,
    manufacturer: "BIG",
    remark: "",
  },
]

for (let i = 0; i < tableBody.length; i++) {
  const rowData = tableBody[i]
  let j = 0
  for (const p in rowData) {
    j = j + 1
    console.log(p, j)
  }
}
