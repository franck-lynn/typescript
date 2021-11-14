// 使用文件描述符 fs.stats 的调用回调
import fs from 'fs'

// 获取文件描述符
fs.open('../hello.txt', 'r', (err, fd) => {
    fs.fstat(fd, (err,  stats) => {
        console.log(stats)
    })
})


fs.stat('../hello.txt', (err, stats) => {
    console.log(stats)
})


