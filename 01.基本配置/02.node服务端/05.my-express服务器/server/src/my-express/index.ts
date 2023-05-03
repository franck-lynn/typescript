import http from "http"
import url from "url"
const createApplication = () => {
  // app 是一个监听函数
  const app: any = (req: http.IncomingMessage, res: http.ServerResponse) => {
    // 获取请求的方法
    const m = req.method?.toLowerCase()
    // console.log("请求方法---> ", m)
    const u = req.url ? url.parse(req.url, true).pathname : undefined
    // console.log("请求url---> ", u)
    // 取出每一个 layer,
    // for (let i = 0; i < app.routes.length; i++) {
    //   const { method, path, handler } = app.routes[i]
    //   if ((method === m || method === "all") && (path === u || path === "*")) {
    //     return handler(req, res)
    //   }
    // }
    // 通过 next 方法进行迭代
    let index = 0
    function next() {
      if (index === app.routes.length) {
        // 如果数组全部迭代, 还没找到, 说明路径不存在
        return res.end(`Cannot ${m}, ${u}`)
      }
      const { method, path, handler } = app.routes[index++] // 每次调用 next 就应该取下一个
      if (method === "middle") {
        // 处理中间件
        if (path === "/" || path === u || u?.startsWith(path + "/")) {
          handler(req, res, next)
        } else {
          next() // 如果中间件没匹配到, 继续走下一个
        }
      } else {
        // 处理路由
        if ((method === m || method === "all") && (path === u || path === "*")) {
          return handler(req, res)
        } else {
          next()
        }
      }
    }
    next() // 中间件中的next方法
    // res.end(`Cannot ${m} ${u}`)
  }

  app.routes = []

  http.METHODS.forEach((method) => {
    method = method.toLowerCase()
    app[method] = function (path: string, handler: any) {
      const layer = {
        method,
        path,
        handler,
      }
      app.routes.push(layer)
    }
  })
  app.use = function (path: any, handler: any) {
    if (typeof handler !== "function") {
      handler = path
      path = "/"
    }
    const layer = {
      method: "middle", // 表示method 是 中间件
      path,
      handler,
    }
    app.routes.push(layer) // 将中间件放进容器中
  }
  // app.get = function (path: string, handler: any) {
  //   const layer = {
  //     mathod: "get",
  //     path,
  //     handler,
  //   }
  //   app.routes.push(layer)
  // }

  app.listen = function (...values: any[]) {
    const server = http.createServer(app)
    server.listen(...values)
  }

  return app
}

export default createApplication
