import mongoose from "mongoose"

before(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri, () => console.log("数据库连接成功"))
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})


after(async () => {
    mongoose.disconnect()
})
