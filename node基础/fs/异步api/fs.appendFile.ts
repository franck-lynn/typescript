// 异步追加文件
import fs from 'fs'
fs.appendFile('../hello.txt', 'data to append, 要增加的数据', (err) => {
    // 这里还要增加关闭文件描述符
    if(err) throw err
    console.log('The "data to append 要增加的数据已经添加到文件了"')
})