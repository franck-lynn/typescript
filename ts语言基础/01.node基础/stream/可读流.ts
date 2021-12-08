// https://www.cnblogs.com/tugenhua0707/p/10821768.html
import fs from 'fs'

const rs = fs.createReadStream('./big.file', {
    flags: 'r', // 文件的操作方式, 和 readFile 中配置一样, 这里默认是可读的是 r
    encoding: 'utf-8',
    autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
    start: 0, // 开始读取的位置
    end: 5, // 读取结束的位置
    highWaterMark: 4 // 每次读取的个数
})

rs.on('open', () => {
    console.log('开始读取文件')
})
rs.on('data', (data) => {
    console.log('读取到的数据: ')
    console.log(data)
})
rs.on('end', () => {
    console.log('文件读取完毕')
})
rs.on('close', () => {
    console.log('文件被关闭')
})
rs.on('error', (err) => {
    console.log('读取文件失败', err)
})



