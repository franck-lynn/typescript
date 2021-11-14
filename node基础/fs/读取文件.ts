import fs from 'fs'
// 同步的
const fd = fs.openSync('./hello.txt', 'r')
console.log(fd)
// 将文件读取到缓冲区, 就先定义一个缓冲区
const buf = Buffer.alloc(12) // 挖出一块内存来放读取的文件
// // console.log(Buffer.byteLength('abc', 'utf-8')) // 字符串的字节数 3
// // function readSync(fd: number, buffer: NodeJS.ArrayBufferView, offset: number, 
// //                   length: number, position: fs.ReadPosition): number (+1 overload)
// // 第3个参数 offset: 缓冲区开始填充的位置, 1 表示从缓冲区 1 的位置开始填充
// // 第4个参数length: 如果挖出的内存长度是多少, 则这个字节长度就是多少, 例如:
// //           12, 就表示最大读取字节数为 < = 11
// // 第5个参数: 1 表示从要读取的文件的哪个字节开始读取
// const rs = fs.readSync(fd, buf, 1, 11, 1) 
// console.log(rs) // 返回文件的字节数
// console.log(buf.toString()) // 文件读取到缓冲区
// **************************************************************************************
// function read<Buffer>(fd: number, buffer: Buffer, offset: number, 
//                         length: number, position: fs.ReadPosition, 
//                         callback: (err: NodeJS.ErrnoException, bytesRead: number,
//                         buffer: Buffer) => void): void

// 异步的读取文件
fs.read(fd, buf, 0, buf.length-1, 0, (err, bytesRead, buffer) => {
    console.log()
    if(err) throw err
    console.log("读取到的字节数", bytesRead, buffer.toString())
    fs.close(fd, () => {
        console.log(fd, "文件读取关闭") // 相当于window 手工打开文件后看了一样就关闭文件了
    })
})
// **************************************************************************************
// function readFile(path: fs.PathOrFileDescriptor, options: {
//                    encoding?: null;
//                    flag?: string;
// } & EventEmitter.Abortable, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void 
// 简单文件的读取
fs.readFile('./hello.txt', {}, (err, buf) => {
    if(err) throw err
    console.log(buf.toString())
})


