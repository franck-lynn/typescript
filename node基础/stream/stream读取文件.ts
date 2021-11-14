import fs from 'fs'
import path from 'path'

// 流读取文件
const reader =  fs.createReadStream(path.resolve(__dirname, '../http/http.ts'))
let len = 0
reader.on('data', (chunk) => {
    // 每次读取的一小块
    console.log(chunk.length)
    len += chunk.length
})

reader.on('end', () => {
    console.log('读取完毕, 读取文件的大小: ' + len)
})