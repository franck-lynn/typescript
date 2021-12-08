import http from 'http'
// 创建 web 服务器
const server = http.createServer( )
// 监听请求
server.on('request', (req, res) => {
    console.log('收到客户端请求', req.url)
})
// 启动服务
server.listen(8080, () => {
    console.log("服务器启动 http://localhost:8080")
})