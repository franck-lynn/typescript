import Koa from "koa"
import { RouterContext } from "@koa/Router"

class IndexController {
    async indexPage(ctx: RouterContext, next: Koa.Next): Promise<void> {
        ctx.body = "主页路由 - index page router"
    }
}
const indexController = new IndexController()
export  default indexController 