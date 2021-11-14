import path from 'path'
import Koa from 'koa'
import koastatic from 'koa-static'

const app = new Koa()
// 在这个目录下的文件都可以通过服务器对外提供服务, 前端项目也会使用这个html文件, 是做为浏览器的入口文件
app.use(koastatic(path.join(__dirname), {
    // https://www.npmjs.com/package/koa-static
    // 配置一些选项 index: '默认起始文件.html'
    index: 'index.html'
}))

app.listen(3000, ()=> {
    console.log("Server is running at http://localhost:3000")
})

// 一次性运行, 详见 package.json 文件
// npm run start