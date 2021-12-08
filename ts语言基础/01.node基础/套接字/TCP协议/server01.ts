// 服务器端套接字 ---- 港口
// 简单通讯
// https://www.cnblogs.com/tzyy/p/5124256.html
// https://blog.csdn.net/banana960531/article/details/89043761
import net from "net"

const t1 = (): void => {
    const server = net.createServer((socket: net.Socket) => {
        socket.write("hello, I'm server")
        // 在服务器端获取连接的地址和端口
        console.log("客户端连接! %j: %j", socket.remoteAddress, socket.remotePort)
        socket.on("data", (data: Buffer) => {
            console.log("服务器端接收来自客户端的信息是: ", data.toString())
            socket.on("close", (had_error) => {
                if (!had_error) {
                    console.log("客户端成功! %j: %j", socket.remoteAddress, socket.remotePort)
                } else {
                    console.log("客户端失败! %j: %j", socket.remoteAddress, socket.remotePort)
                }
            })
        })
        socket.on("error", (err) => {
            console.log("!!有错误!!", err)
        })
    })
    server.on("connection", (socket: net.Socket) => {
        console.log("有连接时触发")
    })
    server.listen(3000, () => {
        console.log("服务器运行在 3000 端口")
    })
}
t1()
// node -r esm server01.ts
// ts-node server01.ts
