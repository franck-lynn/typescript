// koa 的类型声明
import Koa from "koa"

const app: Koa = new Koa()

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    if (ctx.url === "/") {
        console.log("add---> ", add(5, 5))
        ctx.body = "hello"
    }
    next()
})

const add = (a: number, b: number): number => a + b

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})
