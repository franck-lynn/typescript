import mongoose from "mongoose"

const URI = "mongodb://localhost:27017/test"

const connectMongoDB = () => {
    console.log("准备连接数据库", URI)
    mongoose.connect(URI, () => console.log("数据库连接成功"))
    // 错误信息, 绑定错误信息处理, 以便定位错误,
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
}

export { connectMongoDB }
export { User } from "./user"
