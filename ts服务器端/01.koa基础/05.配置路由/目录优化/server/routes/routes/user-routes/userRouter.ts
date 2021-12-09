
import Router from '@koa/router'
import {register} from '../../controllers'

const router = new Router()
const userRouter = router.get('/user', register)

export  default userRouter 