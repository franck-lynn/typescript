
import Koa from "koa"
import koaBody from 'koa-body'

const app = new Koa()

// 使用 koa-body 插件
app.use(koaBody({jsonLimit: '1kb'}))

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(async (ctx) => {
    const body = ctx.request.body
    if(!body.name) ctx.throw(400, '请求里面要有 name 字段')
    ctx.body = {
        name: body.name.toUpperCase()
    }
})

app.listen(3000, () => {
    //! nodemon -r esm  05.koa-body.ts
    console.log("Server is running at http://localhost:3000")
})
