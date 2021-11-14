// 假设导入的模块没有声明文件

import * as moment from 'moment'  // 原有模块

declare module "moment" {
    export function foo(): moment.CalendarKey
}


