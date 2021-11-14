// 简单文件写入, 异步的
import fs from 'fs'
// 要操作文件的路径, data 数据,. 要写入的数据, option 选项(可以对写入设置), 回调函数
fs.writeFile('./hello.txt', '要写入的数据', {}, (err) => {
    if(err) console.log(err)
    console.log('写入成功')
})