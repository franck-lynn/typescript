import fs from 'fs'
// 打开文件, 写入内容, 保存并关闭文件
// 同步的
const fd = fs.openSync('./hello.txt', 'w') // 返回文件的描述符
// 文件描述符, 写入的内容
fs.writeSync(fd, 'hello world')
// 关闭文件
fs.closeSync(fd) // fd 要关闭哪个文件, fd 文件描述符


// 异步
// 打开文件 
fs.open('./hello.txt', 'w', (err, fd) => {
    // 写入文件,
    fs.write(fd, '要写入的字符串', (err, data) => {
        if(err) throw err
        else console.log(data)
        //  关闭文件
        fs.close(fd, () => {
            console.log("文件保存")
        })
    })
})






















