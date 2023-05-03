import dayjs from "dayjs"
import { Decimal } from "decimal.js"

import { ContractTableTuple, ContractType } from "../types"

export const contractInfo: ContractType = {
  contractNo: "HTHZHZL230223-2080",
  customerOrderId: "CIM20230808",
  signedDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  pointOfDelivery: "需方",
  timeOfDelivery: "3-5天",
  termsOfPayment: "货到30天内付款",
  deliveryWay: "FF",
  isTax: true,
}

// 生成表格的头部, 合同, 报价单的表头都可以使用这种
export const contractHeader = (isTax: boolean): ContractTableTuple[] => {
  if (isTax) {
    return [
      ["序号", "名称", "型号及材质", "数量", "单价", "总价", "品牌", "备注"],
      ["", "", "", "", "人民币含税", "", "", ""],
    ]
  } else {
    return [
      ["序号", "名称", "型号及材质", "数量", "单价", "总价", "品牌", "备注"],
      ["", "", "", "", "人民币不含税", "", "", ""],
    ]
  }
}

export const contractBody: ContractTableTuple[] = [
  [
    1,
    "美夹新倍比高精度弹簧筒夹刀柄",
    "BBT30-MEGA6N-60-L",
    1,
    new Decimal("8888.88"),
    new Decimal("8888.88"),
    "大昭和精",
    "这是进口高精度的筒夹刀柄",
  ],
  [
    2,
    "铣刀",
    "2JJB 004 008 S04 0.2R X 0.4,L1=,L2=0.8,L=40,d=4",
    50,
    new Decimal("371.55"),
    new Decimal("18577.5"),
    "韩国匠精",
    "用于淬火材料加工",
  ],
  [3, "铰刀头", "SRL32.001Q+3-3 B01F0512R1(3PCS价)", 3, new Decimal("5362.90"), new Decimal("16088.7"), "SUMI", ""],
  [4, "铰刀杆", "SRD36-25-170", 1, new Decimal("4586.20"), new Decimal("4586.20"), "SUMI", ""],
  [5, "铰刀杆", "SRB24-16-128", 1, new Decimal("4058.74"), new Decimal("4058.74"), "SUMI", ""],
  [6, "铰刀头", "SRG20.001Q+3-3-A01-F0512R1 (3片价)", 3, new Decimal("5227.27"), new Decimal("15681.81"), "SUMI", ""],
  [7, "刀片", "D32JS5*45*D32*150L", 50, new Decimal("3989.00"), new Decimal("3989.00"), "晨一", ""],
  [8, "刀片", "TDHT160604R-M TK6025U", 30, new Decimal("21.00"), new Decimal("630"), "TK", ""],
  [9, "刀片", "62525 EX-SUS-GDR 2.5", 1, new Decimal("49.52"), new Decimal("49.52"), "OSG", ""],
  [10, "刀片", "62533 EX-SUS-GDR 3.3", 1, new Decimal("53.42"), new Decimal("53.42"), "OSG", ""],
  [11, "刀片", "8598025 EX-SUS-GDR 10.25", 1, new Decimal("286.43"), new Decimal("286.43"), "OSG", ""],
]
