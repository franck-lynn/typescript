
import { expect } from "chai"
import { IUser } from "../src/models/user.model"
import {createUser,findUser, deleteAllUser} from "../src/services/user.service"

const userPayload: IUser = {
    name: "Jane Doe",
    password: "aPassword123",
    email: "Jane@example.com",
}

describe("User 的数据库文档测试", function () {
    
    
    describe("一. 测试 createUser() 方法", function () {
        it("会创建一个用户", async () => {
            const user = await createUser(userPayload)
            expect(user.password).to.be.length(60)
            expect(user.name).to.be.equal(userPayload.name)
            expect(user.email).to.be.equal(userPayload.email)
        })
    })
    
    
})

// supertest tsconfig-paths
