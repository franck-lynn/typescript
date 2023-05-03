import { Decimal } from "decimal.js"
import { TupleContractBody } from "../types"

export const contractBOM: TupleContractBody[] = [
  [
    "1",
    "美夹新倍比高精度弹簧筒夹刀柄",
    "BBT30-MEGA6N-60-L",
    "20000",
    new Decimal("8888.88"),
    new Decimal("88888.88"),
    "大昭和精",
    "这是进口高精度的筒夹刀柄",
  ],
  [
    "2",
    "铣刀",
    "2JJB 004 008 S04 0.2R X 0.4,L1=,L2=0.8,L=40,d=4",
    "50",
    new Decimal("371.55"),
    new Decimal("18577.5"),
    "韩国匠精",
    "用于淬火材料加工",
  ],
  ["3", "Val31", "Val32", "Val33", new Decimal("0"), new Decimal("0"), "", ""],
]
