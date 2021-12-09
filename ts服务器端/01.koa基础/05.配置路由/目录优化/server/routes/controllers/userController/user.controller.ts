import koa from "koa"
import { RouterContext } from "@koa/Router"

class UserController {
    async register(ctx: RouterContext, next: koa.Next): Promise<void> {
        ctx.body = "用户注册成功"
    }
}
const userController = new UserController()
export  default userController 
