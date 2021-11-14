import Koa from "koa"

const app = new Koa()

const pageNotFunound = async (ctx: Koa.ParameterizedContext) => {
    ctx.status = 403
    // 检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，
    // 否则为 false。 type 值可能是一个或多个 mime 类型的字符串，
    // 如 application/json，扩展名称如 json，或数组 ["json", "html", "text/plain"] 
    //! 针对不同的文件进行不同的处理和响应
    switch (ctx.accepts("html", "json")) {
        case "html":
            ctx.type = "html"
            ctx.body = "<p>Page Not Found</p>"
            break
        case "json":
            ctx.body = {
                message: "Page Not Found",
            }
            break
        default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found' 
    }
}

app.use(pageNotFunound)

app.listen(3000, () => {
    //! nodemon -r esm 03.404.ts
    console.log("Server is running at http://localhost:3000")
})
