import Koa from 'koa'
import dotenv from 'dotenv'
import routes from './routes'


const app = new Koa()

// 获取环境配置中的变量
dotenv.config({path: '../.env' })
const {HOST_NAME, PORT } = process.env

routes(app)


app.listen(PORT, () => {
    console.log(`Server is running at ${HOST_NAME}:${PORT}`)
})


// 运行
// 直接 右键运行
// 或者 在 package 所在目录
// nodemon -r esm app.ts
// ts-node app.ts
// 或者  npm run dev