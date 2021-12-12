
import mongoose from "mongoose"
import { expect } from "chai"
import { User } from "../src/models/user.model"
import { createUser, findUser } from "../src/services/user.service"

before(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri, () => console.log("数据库连接成功"))
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})

describe("User 的数据库文档测试", function () {
    
    describe("一. 测试 createUser() 方法", function () {
        
        it("01. 创建一个新用户", async () => {
            const aUser = new User({ name: "aaaa" })
            const user = await createUser(aUser)
            expect(user.name).to.be.equal('aaaa') 
        })
        
        it("02. 查询一个用户", async () => {
            const name = 'zzr'
            const user = await findUser(name)
            expect(user!.name).to.be.equal('zzr')
        })
    })
})

after(async () => {
    mongoose.disconnect()
})


// supertest tsconfig-paths