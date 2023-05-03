import { Decimal } from "decimal.js"
import { findIndex } from "ramda"

import { contractHeader } from "../../sheet-data/contract"
import { ContractTableTuple, ContractType } from "../../types"
import { setupTableHeader } from "../commons/setupTableHeader"

const MAX_ROW_NO = 8

export const createContractBomHelper = (
  contractInfo: ContractType, //
  contractBody: ContractTableTuple[]
) => {
  // 设置表头
  const isTax = contractInfo.isTax
  const cHeader = contractHeader(isTax)

  const header = setupTableHeader(cHeader)

  // 根据表格最大行数是否大于 8 行, 来绝对是否添加附表, 大于8行添加附表, 原来的表格也要补齐 8 行
  const headerUp = cHeader[0]
  const J1 = findIndex((v) => v === "单价", headerUp)
  const J2 = findIndex((v) => v === "总价", headerUp)

  const len = contractBody.length
  const isGtMaxRowNo = len > MAX_ROW_NO
  const isLtMaxRowNo = len < MAX_ROW_NO

  const attachData = contractBody // 把明细数据先保存起来

  if (isGtMaxRowNo) {
    const seeingAttatchData: ContractTableTuple[] = new Array<ContractTableTuple[]>(MAX_ROW_NO).fill([]).map((_, i) => {
      return new Array<ContractTableTuple[keyof ContractTableTuple]>(headerUp.length).fill("").map((_, j) => {
        let el: string | Decimal | number = ""
        if (i === 0 && j === 1) el = "详情请见附表"
        else if (j === J1 || j === J2) el = new Decimal("0")
        else el = ""
        return el
      })
    }) as ContractTableTuple[]
    contractBody = seeingAttatchData
  }

  if (isLtMaxRowNo) {
    // 小于 8 行补齐 8 行数组
    const supplementData = new Array<ContractTableTuple[]>(MAX_ROW_NO - len).fill([]).map((_, i) => {
      return new Array<ContractTableTuple[keyof ContractTableTuple]>(headerUp.length).fill("").map((_, j) => {
        let el: string | Decimal | number = ""
        if (j === 0) el = i + len + 1
        else if (j === J1 || j === J2) el = new Decimal("0")
        else el = ""
        return el
      })
    }) as ContractTableTuple[]
    contractBody = contractBody.concat(supplementData)
  }

  return { header, attachData, cBody: contractBody }
}
