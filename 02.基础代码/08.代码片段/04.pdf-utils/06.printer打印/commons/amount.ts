import { Decimal } from "decimal.js"
import { compose, findIndex, pluck, filter, not, isEmpty } from "ramda"

import capitalCny from "./capital"
import { ContractTableTuple } from "../types"

const TAX_RATIO = 0.13

export const amount = (bom: ContractTableTuple[], isTax: boolean, headerUp: ContractTableTuple) => {
  let taxAmount: Decimal | string = new Decimal("0")
  let taxAndPriceAmount: Decimal | string = new Decimal("0")
  let priceAmount: Decimal | string = new Decimal("0")

  // 先根据 标题查找总价是第几项?
  const n = findIndex((v) => v === "总价", headerUp)
  // pluck 这一项
  const pluckTotal = pluck(n, bom)

  const filterPluck = filter(compose(not, isEmpty), pluckTotal)

  const mm = filterPluck.reduce((acc, curr) => Decimal.add(acc, curr), new Decimal("0")) as Decimal
  if (isTax) {
    taxAndPriceAmount = mm // 价税合计 (第1, 2页都用到, 但计算方法不同, 直接相加)
    taxAmount = Decimal.mul(taxAndPriceAmount, TAX_RATIO) // 含税时计算税额(第1页用到 价税合计* 0.13)
  } else {
    priceAmount = mm // 未税时计算未税合计 (第1, 2页用到, 直接相加)
    taxAmount = Decimal.mul(priceAmount, TAX_RATIO) // 税额合计 (第1, 2页用到, priceAmount * 0.13 )
    taxAndPriceAmount = Decimal.mul(priceAmount, 1 + TAX_RATIO) // 价税合计 (第1, 2页都用到, 但计算方法不同, 上面2项相加)
  }
  taxAndPriceAmount = taxAndPriceAmount.toFixed(2)
  taxAmount = taxAmount.toFixed(2)
  // 转大写
  const capitalTaxAndPriceAmount = capitalCny(parseFloat(taxAndPriceAmount))

  return {
    taxAmount,
    taxAndPriceAmount,
    priceAmount,
    capitalTaxAndPriceAmount,
  }
}
