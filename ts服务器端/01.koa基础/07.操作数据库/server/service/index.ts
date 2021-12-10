import mongoose from "mongoose"
import { MONGO_URI } from "../contstants"

const connectMongoDB = (): void => {
    console.log("准备连接数据库", MONGO_URI)
    // mongoose.connect(MONGO_URI, () => console.log("数据库连接成功"))
    // // 错误信息, 绑定错误信息处理, 以便定位错误,
    // mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
}

export {connectMongoDB}
