import http, { IncomingMessage, ServerResponse } from "http"
import fs from "fs"

http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // fs.readFile('./big.file', (err, data) => {
    //     if(err) throw err
    //     res.end(data)
    // })
    // 上面代码相当于把整个文件都存放再内存了, 效率低
    // res 也是可读流, 先通过 pipe() 将文件泵到缓冲区
    const src = fs.createReadStream('./big.file')
    src.pipe(res)
}).listen(3000, () => {
    console.log("http://localhost:3000")
})

// nodemon -e  ts,tsx  --exec ts-node 读取大文件.ts 

