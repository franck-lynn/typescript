// buffer 和数组类似, 数组不能存储二进制, buffer 存储二进制数组.
// 它的元素为一个16进制的两位数
// 不需要引入 模块
const str = 'hello buffer中'
// 把字符串保存到 buffer
const buf1 = Buffer.from(str)
// 汉字占 3个字节, 英文是1个字符一个字节
console.log("buffer 长度, 内存中占用的字节", buf1.length, ',字符串长度', str.length)
console.log("都是以16进制显示, unicode编码", buf1)
// 创建指定大小的 buffer

// 创建一个 10 个字节的数组
const buf2 = Buffer.alloc(10)
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa // 16 进制
buf2[3] = 256 // 只保留8位, 前面的1舍弃, 就变成了0(16进制) 
// buf2[10] = 15 // 存不进去, buffer 大小一旦确定, 则不能修改
console.log(buf2)



