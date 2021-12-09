import Router from "@koa/router"
import {indexPage} from '../../controllers'

const router = new Router()

// const indexRouter = router.get("/", async (ctx, next) => {
//     ctx.body = "主页路由"
// })


const indexRouter = router.get("/", indexPage)

export { indexRouter }
