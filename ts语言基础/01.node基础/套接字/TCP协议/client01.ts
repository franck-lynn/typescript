import net from "net"

const t2 = () => {
    //! 1. 创建客户端套接字
    const socket = new net.Socket({ readable: true, writable: true, allowHalfOpen: true })

    //! 2. 客户端与服务器进行连接,
    socket.connect({ host: "localhost", port: 3000 }, () => {
        // 连接成功时触发
        console.log("已连接到服务器")
        // 给服务器传送数据
        socket.write("Hello, I'm client  " + Math.random())
        // 客户端套接字监听来自服务器的数据
        socket.on("data", (data) => {
            // 接收到数据后关闭套接字
            console.log("接收到服务器数据---> " + data.toString())
            // socket.end() // 套接字结束
            socket.destroy()
        })
    })
    socket.on("end", () => {
        console.log("客户端主动关闭了连接")
    })
    // 客户端监听套接字关闭, 只是客户端的监听, 与服务端无关
    socket.on("close", () => {
        console.log("客户端关闭成功")
    })
    // 客户端监听错误
    socket.on("error", () => {
        console.log("客户端错误")
    })
}

t2()
// node -r esm client01.ts
// ts-node client01.ts
