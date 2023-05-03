// https://pdfmake.github.io/docs/0.1/document-definition-object/columns/
import PdfPrinter from "pdfMake"
import path from "path"
import fs from "fs"
import type { TDocumentDefinitions, Content } from "pdfmake/interfaces"

import { fonts } from "./fonts-setting"

import {
  ROW_MARGIN,
  SUB_TABLE_HEADER_FONTSIZE,
  TABLE_BODY_FONTSIZE,
  TABLE_HEADER_HEIGHT,
  TABLE_HEADER_MIDDLE,
  TABLE_HEIGHT,
} from "./table-constants"

const filepath = path.resolve(__dirname, "./basics.pdf")
// 后端是可以操作文件的
// 需要字体拷贝

// @ts-ignore
const printer = new PdfPrinter(fonts)

const docDefinition: TDocumentDefinitions = {
  defaultStyle: { font: "SimSum", fontSize: TABLE_BODY_FONTSIZE },
  styles: {
    tableHeader: { font: "msyh", bold: true },
    subTableHeader: { font: "msyh", bold: true, fontSize: SUB_TABLE_HEADER_FONTSIZE },
  },

  content: [
    {
      text: "购     货     合     同",
      style: { font: "msyh", bold: true, alignment: "center", fontSize: 20 },
      margin: [0, 0, 0, 8],
    },
    /* 第1块表格开始 */
    {
      table: {
        widths: [58, "*", 58, "*", 10], // 有 5列

        body: [
          [
            { text: "供      方: ", border: [false, false], margin: [0, ROW_MARGIN] }, // 无边框
            { text: "杭州德美瑞数控工具有限公司", border: [false, false, false, true], margin: [0, ROW_MARGIN] }, // 仅下边有边框
            { text: "合 同 编号: ", border: [false, false], margin: [0, ROW_MARGIN] }, // 无边框
            { text: "HTHZLRY20230312-000688", border: [false, false, false, true], margin: [0, ROW_MARGIN] }, // 仅下边有边框
            { text: "FF", border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          ],
          [
            { text: "需      方: ", border: [false, false], margin: [0, ROW_MARGIN] },
            { text: "北京金万众科技股份有限公司", border: [false, false, false, true], margin: [0, ROW_MARGIN] },
            { text: "日      期: ", border: [false, false], margin: [0, ROW_MARGIN] },
            { text: "2023-03-12 15:35:21", colSpan: 2, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          ],
          [
            {
              text: "经供需双方协商达成如下协议,并签定本合同.",
              colSpan: 2,
              border: [false, false],
              margin: [0, ROW_MARGIN],
            },
            "",
            { text: "客户订单号:", border: [false, false], margin: [0, ROW_MARGIN] },
            { text: "", colSpan: 2, border: [false, false, false, true], margin: [0, ROW_MARGIN] },
          ],
        ],
      },
    },
    /* 第1块表格结束 */
    {
      text: " ", // 空行设置
      style: { alignment: "center", fontSize: 6 },
    },
    /* 第 2 块表格开始, 数据所在表格 */
    {
      layout: {
        hLineWidth: (rowIndex: number) => {
          if (rowIndex === 0 || rowIndex === 2) return 2
          return 1
        },
        vLineWidth: () => 1,
        hLineColor: () => "gray",
        vLineColor: () => "gray",
      },

      table: {
        headerRows: 2,
        // 数字设置的是固定列宽,
        // star 表示填充剩余空间, 如果多余一个 star, 平均分配剩余空间
        // auto 表示根据内容决定长度
        widths: [16, 60, 120, "auto", "auto", "auto", 40, "*"],
        heights: function (row: number) {
          if (row === 0 || row === 1) {
            return TABLE_HEADER_HEIGHT
          }
          return TABLE_HEIGHT
        },

        body: [
          [
            {
              text: "序号",
              rowSpan: 2, // 跨行, 2行的数据长度要一样, 下一行的数据为 ""
              alignment: "center", // 水平居中, 假设字体高度 10, 移动到半个字体高度差不多就居中对齐了
              style: "tableHeader",
            },
            {
              text: "名称",
              rowSpan: 2,
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            {
              text: "型号及材质",
              rowSpan: 2,
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            {
              text: "数量",
              rowSpan: 2,
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              style: "tableHeader",
            },
            { text: "单价", alignment: "center", style: "subTableHeader" },
            { text: "总价", alignment: "center", style: "subTableHeader" },
            {
              text: "品牌",
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              border: [true, true, true, false],
              style: "tableHeader",
            },
            {
              text: "备注",
              alignment: "center",
              relativePosition: TABLE_HEADER_MIDDLE,
              border: [true, true, true, false],
              style: "tableHeader",
            },
          ],
          // 第2行列数仍然要和第1行一样, 被跨的列数据为空
          [
            "",
            "",
            "",
            "",
            { text: "人民币含税", colSpan: 2, alignment: "center", style: "subTableHeader" },
            "",
            // 跨列后要在后面的列的边框都去掉才好看一些, 上下2行对应的边框都要去掉
            { text: "", border: [true, false] },
            { text: "", border: [true, false, true, true] },
          ],
          // 数据列与表头的最多列要一样
          [
            { text: 1, alignment: "center" /* margin: [0, 1] 设置可以垂直居中 */ },
            "美夹新倍比高精度弹簧筒夹刀柄",
            "BBT30-MEGA6N-60-L",
            "20000",
            "8888.88",
            "88888.88",
            { text: "大昭和精", alignment: "center" },
            "这是进口高精度的筒夹刀柄",
          ],
          [{ text: 20, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 40, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [{ text: 60, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
          [
            { text: 80, alignment: "center" },
            "铣刀",
            "2JJB 004 008 S04 0.2R X 0.4,L1=,L2=0.8,L=40,d=4",
            "50",
            "371.55",
            "18577.5",
            { text: "韩国匠精", alignment: "center" },
            "用于淬火材料加工",
          ],
          [{ text: 80, alignment: "center" }, "Val2", "Val12", "Val3", "", "", { text: "", alignment: "center" }, ""],
        ],
      },
    },

    // 注释表格
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: "注释：请签约人在合同编号后选择交货方式，交货方式分别为： FF: 可分批交货，并开具等值发票/   ",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: `FY: 可分批交货，货品全齐时一次开发票/  YY:  不可分批发货，一次性发货并开发票`,
              border: [true, false, true, true],
            },
          ],
          [
            {
              text: `未税合计: `,
              border: [true, false, true, true],
            },
          ],
        ],
      },
    },
    // 含税合计
    {
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            { text: `含税合计(含13%增值税: 88888)`, border: [true, false, true, true] },
            { text: `(大写): 人民币元角分`, border: [true, false, true, true] },
          ],
        ],
      },
    },
    // 运输表格
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: `质量标准：按制造商的质量技术标准执行`,
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: `运输、包装要求、费用负担：适合于长途运输，费用由供方承担。`,
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: `提出异议期限: 需方收到货后30天内提出异议。`,
              border: [true, false, true, true],
            },
          ],
        ],
      },
    },
    {
      table: {
        widths: [45, "*", 45, "*"],

        body: [
          [
            { text: "交货期: ", border: [true, false, true, true] },
            { text: "3-4天", border: [true, false, true, true] },
            { text: "收货人: ", border: [true, false, true, true] },
            { text: "袁慧芳", border: [true, false, true, true] },
          ],
          [
            { text: "交货地: ", border: [true, false, true, true] },
            { text: "需方", border: [true, false, true, true] },
            { text: "邮寄地址: ", border: [true, false, true, true] },
            {
              text: "浙江省杭州市西湖区西湖科技园振华路200号 瑞鼎大厦B616室",
              border: [true, false, true, true],
            },
          ],
          [
            { text: "结算方式: ", border: [true, false, true, true] },
            { text: "款到发货", border: [true, false, true, true] },
            { text: "电话: ", border: [true, false, true, true] },
            {
              text: "13738047179",
            },
          ],

          [
            { text: "供方: ", rowSpan: 2, border: [true, false, false, false] },
            {
              text: "北京金万众机械科技股份有限公司 ",
              border: [false, false],
            },
            { text: "需方: ", rowSpan: 2, border: [true, false, false, false] },
            {
              text: "杭州德美瑞数控工具有限公司  ",
              border: [false, false, true, false],
            },
          ],
          // 被合并的行也要填充
          [
            { text: "" },
            { text: "盖章", border: [false, false] },
            { text: "" },
            { text: "盖章", border: [false, false, true, false] },
          ],
          [
            { text: "供方代表: ", border: [true, false, false, true] },
            {
              text: "",
              border: [false, false, true, true],
            },
            { text: "需方代表: ", border: [true, false, false, true] },
            {
              text: "",
              border: [false, false, true, true],
            },
          ],
          // 开票资料
          [
            { text: "开户银行: ", border: [true, false, true, true] },
            { text: "工行北京四道口支行", border: [true, false, true, true] },
            { text: "邮寄地址: ", border: [true, false, true, true] },
            { text: "浙江省杭州市西湖区西湖科技园振华路200号 瑞鼎大厦B616室", border: [true, false, true, true] },
          ],
          [
            { text: "账号: ", border: [true, false, true, true] },
            { text: "0200049309201184758", border: [true, false, true, true] },
            { text: "开户银行: ", border: [true, false, true, true] },
            { text: "杭州联合银行新世纪支行", border: [true, false, true, true] },
          ],
          [
            { text: "纳税人识别号: ", border: [true, false, true, true] },
            { text: "9111022857687099XQ", border: [true, false, true, true] },
            { text: "账号: ", border: [true, false, true, true] },
            { text: "201000068144689", border: [true, false, true, true] },
          ],
          [
            { text: "地址: ", border: [true, false, true, true] },
            { text: "北京市密云区云西三路1号院", border: [true, false, true, true] },
            { text: "纳税人识别号: ", border: [true, false, true, true] },
            { text: "91330105555153246L", border: [true, false, true, true] },
          ],
          [
            { text: "邮寄地址: ", border: [true, false, true, true] },
            { text: "北京市海淀区蓝靛厂南路25号牛顿办公区1215号", border: [true, false, true, true] },
            { text: "开票地址: ", border: [true, false, true, true] },
            { text: "浙江省杭州市西湖区西湖科技园振华路200号 瑞鼎大厦B616室", border: [true, false, true, true] },
          ],
          [
            { text: "联系人: ", border: [true, false, true, true] },
            { text: "赵亚芬", border: [true, false, true, true] },
            { text: "联系人: ", border: [true, false, true, true] },
            { text: "袁会芳", border: [true, false, true, true] },
          ],
          [{ text: "联系方式: ", colSpan: 4, border: [true, false, true, true] }],
          [
            { text: "电话: ", border: [true, true, false, false] },
            { text: "0571-85301572", border: [false, true, true, false] },
            { text: "电话: ", border: [true, true, false, false] },
            { text: "0571-87830396", border: [false, true, true, false] },
          ],
          [
            { text: "传真: ", border: [true, false, false, false] },
            { text: "0571-85301572", border: [false, false, true, false] },
            { text: "传真: ", border: [true, false, false, false] },
            { text: "0571-87830396", border: [false, false, true, false] },
          ],
          [
            { text: "邮件: ", border: [true, false, false, false] },
            { text: "0571-85301572", border: [false, false, false, false] },
            { text: "邮件: ", border: [true, false, false, false] },
            { text: "0571-87830396", border: [false, false, true, false] },
          ],
        ],
      },
    },
    {
      table: {
        widths: [40, "*"],
        body: [
          [
            { text: "备注:", rowSpan: 5 },
            { text: "1.供需双方必须全面履行合同，违约方应按《中华人民共和国民法典》承担责任。" },
          ],
          [{ text: "" }, { text: "2.供需双方发生争议，协商调解不能解决，则按《中华人民共和国民法典》进行诉讼。" }],
          [{ text: "" }, { text: "3.本合同依法签订，具有法律效力，任何一方不得擅自变更或解除。如需变更和解除" }],
          [{ text: "" }, { text: "时，应按《中华人民共和国民法典》关于变更或解除的条款办理。" }],
          [{ text: "" }, { text: "4.本合同一式两份，买卖双方各执一份，复印件具有同等法律效力。" }],
        ],
      },
    },
  ],

  // 设置页脚
  footer: (currentPage: number, pageCount: number /* , pageSize: ContextPageSize */): Content => {
    return {
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            { text: "", margin: [30, ROW_MARGIN] },
            {
              text: `第 ${currentPage} 页, 共 ${pageCount}页`,

              style: { alignment: "right" },
              margin: [30, ROW_MARGIN],
            },
          ],
        ],
      },
      // 取消边框在 table 的同级
      layout: "noBorders",
    }
  },
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)

pdfDoc.pipe(fs.createWriteStream(filepath))

pdfDoc.end()
