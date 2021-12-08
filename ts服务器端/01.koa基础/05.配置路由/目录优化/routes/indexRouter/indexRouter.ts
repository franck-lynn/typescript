import Router from "@koa/router"

const router = new Router()

const indexRouter = router.get("/", async (ctx, next) => {
    ctx.body = "主页路由"
})

export { indexRouter }
