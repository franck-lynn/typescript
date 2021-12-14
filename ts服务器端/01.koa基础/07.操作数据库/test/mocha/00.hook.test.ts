import mongoose from "mongoose"
// import { app } from "../../server/application"
import app from "../../server/application"
import { PORT } from "../../server/contstants"
// import {server} from './02.application.test'

const server = app.listen(PORT)

before(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri)
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})
// https://blog.csdn.net/weixin_36554693/article/details/105931758
after(async (done) => {
    mongoose.disconnect()
    if (server) {
        server.close()
    }
    done()
})
export { server }
