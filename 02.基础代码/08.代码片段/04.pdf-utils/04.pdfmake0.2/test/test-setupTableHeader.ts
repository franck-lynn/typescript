import { headerUp, headerdown } from "../data/table-contract-header"
import { setupTableHeader } from "../helpers"
/*
                1       2        3              4         5              6       7        8
headerup =    ["序号", "名称", "型号及材质", "数量", "  单价",         "总价", "品牌", "备注"]
headerdown  = ["",      "",      "",            "",    "人民币含税",    "",      "",       ""]
               1       2         5              6         7              8        10        11
                       3                                                 9                  12
                       4
表格总共12列,
第1列:  { rowSpan: 2  }  序号
第2列   { rowSpan: 2, colSpan: 3 }      名称                
第3列   { rowSpan: 2 }           型号及材质               
第4列   { rowSpan: 2 }      数量                
第5列          单价      人民币(不)含税 {colSpan: 3 }                 
第6列   {  colSpan: 2 }   总价                       
第7列   { rowSpan: 2 }      品牌               
第8列   { rowSpan: 2, colSpan: 2 }     备注                         
*/
const tc = setupTableHeader(headerUp, headerdown)

console.log(tc)


