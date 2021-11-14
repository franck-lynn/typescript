/// <reference path = "../typings/moment-plugin/index.d.ts" />
// 假设导入的模块没有声明文件
import * as moment from 'moment'   
// 导入声明文件, 但是运行的时候还是会报错的, 
// 因为没有定义具体的实现
// import '../typings/moment-plugin'

moment.foo()