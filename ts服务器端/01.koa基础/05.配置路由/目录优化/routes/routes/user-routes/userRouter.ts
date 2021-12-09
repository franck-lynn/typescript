
import Router from '@koa/router'

const router = new Router()

const userRouter = router.get('/user', async(ctx, next) => {
    ctx.body = "用户路由"
})

export  default userRouter 