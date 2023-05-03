import { Decimal } from "decimal.js"

export type TupleContractHeader = [string, string, string, string, string, string, string, string]
export type TupleContractBody = [string, string, string, string, Decimal, Decimal, string, string]

/**
 * 联系人信息
 */
export interface ContactType {
  name: string
  mobile: string
  address: string
}

/**
 * 开票信息
 */
export interface BillingInfoType {
  company: string
  TaxpayerId: string // Taxpayer Identification Numbe 纳税人识别号
  bank: string
  account: string
  addressAndTel: string
}

/**
 * 合同信息
 */
export interface ContractType {
  contractNo: string
  customerOrderId: string
  signedDate: Date
  pointOfDelivery: string // Point of Delivery 交货地
  timeOfDelivery: string // time of delivery 交货期
  termsOfPayment: string // terms of payment  付款方式
  deliveryWay: "FF" | "FY" | "YY"
  isTax: boolean
}
