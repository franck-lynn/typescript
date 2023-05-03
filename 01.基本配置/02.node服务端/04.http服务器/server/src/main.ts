import http from "http"
import url from "url"
// https://blog.csdn.net/weixin_44827418/article/details/119494952
// 创建 web 服务器的实例 http.RequestListener
const server = http.createServer()

// createServer() 里传入的参数是一个请求监听 RequestListener
// const requestListener: http.RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
//   console.log(res)
// }

// 绑定 request 事件, 只要有客户端请求这个服务器, 就会触发
// request 事件, 从而触发这个事件处理函数
server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  const str = `请求的 URL 是 ${req.url}, 请求的类型是 ${req.method} `
  console.log("req===> ", str)
  // url.parse(req.url, true) 第2个参数 true, 可以把字符串转化成 json 对象
  const urlObj: url.UrlObject | undefined = req.url ? url.parse(req.url, true) : undefined
  console.log("url模块 解析出 url 对象 => ", urlObj)
  res.setHeader("Content-type", "text/html; charset=utf-8")
  // 这里对 req.url 进行路由判断
  // 发送给客户端
  res.end(str)
})
// 启动 http 服务器 {port: 3000, listeningListener: () => {console.log("server is running at http://localhost:3000")}}
server.listen(3000, () => {
  console.log("server is running at http://localhost:3000")
})
