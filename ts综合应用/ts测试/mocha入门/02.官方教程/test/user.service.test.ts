import { expect } from "chai"
import mongoose from "mongoose"
import { User } from "src/models/user.model"
import { createUser } from "../src/services/user.service"

beforeEach(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri, () => console.log("数据库连接成功"))
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})

describe("User 数据库文档", function () {
    describe("#createUser() 方法", function () {
        it("创建一个新用户", async () => {
            const user = new User({ name: "aaaa" })
            const u = await createUser(user)
            expect(u.name).to.be.equal('aaaa') 
        })
    })
})

afterEach(async () => {
    mongoose.disconnect()
})
