import net from "net"
const stdin = process.stdin
const stdout = process.stdout

const HOST = "localhost"
const PORT = 3000
// 通过 client 发送和接收消息
const client = new net.Socket()
client.connect(PORT, HOST, () => {
  console.log("CONNECTED TO SERVER: " + HOST + ":" + PORT)
  stdout.write(">> ")
  stdin.resume() // 等待输入
  stdin.setEncoding("utf-8")
  stdin.on("data", function (input: string) {
    if ("quit" == input.trim()) {
      client.destroy()
      stdin.destroy()
    } else {
      client.write(input)
    }
  })
})
client.on("data", function (data) {
  console.log("server: " + data)
  stdout.write(">> ")
})
client.on("close", function () {
  console.log("Connection closed")
})

// 首先得要先启动服务器, 而且在 node 环境下, 不是在浏览器环境下, 所以 tsconfig.json 文件不协议
