import { MONGODB_URI } from "../contstants"
// mongoose 连接封装
import mongoose from "mongoose"

const initDb = () => {
  // 建立连接
  if (!MONGODB_URI) {
    console.error.bind(console, "mongodb 无连接地址, mongodb no url connected")
    throw new Error("mongodb 无连接地址, mongodb no url connected")
  }
  mongoose.connect(MONGODB_URI)
  // 判断连接状态
  const db: mongoose.Connection = mongoose.connection
  db.on("error", console.error.bind(console, "mongodb 连接异常, mongodb connect exception"))
  db.once("open", () => console.log("mongodb 连接成功, mongodb connected success."))
}

export { initDb }
