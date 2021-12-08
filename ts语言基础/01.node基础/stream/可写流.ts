// https://www.cnblogs.com/tugenhua0707/p/10821768.html
import fs from "fs"
const ws = fs.createWriteStream("./big.file", {
    flags: "w", //  文件的操作方式，同writeFile中的配置一样，这里默认是可读的是 w
    encoding: "utf-8", // 编码格式
    autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
    start: 0, // 开始写入的位置
    highWaterMark: 1, // 每次写入的个数
})
ws.write("1", "utf-8", () => {
    console.log("写入成功1111")
})
ws.write("2", "utf-8", () => {
    console.log("写入成功2222")
})

ws.write("3", "utf-8", () => {
    console.log("写入成功3333")
})
// 标记文件末尾
ws.end()
ws.on("finish", () => {
    console.log("写入完成")
})
ws.on("error", (err) => {
    console.log(err)
})
