
import { expect } from "chai"
import { createUser, findUser, deleteAllUser, loginUser, registerUser } from "../../server/services"
import { User, IUser, UserDocument } from "../../server/models/user.model"

// https://www.cnblogs.com/Leo_wl/p/5734889.html


describe("一. 测试 user.service.ts", function () {
    this.afterAll(async () => {
        await deleteAllUser()
    })
    this.afterEach(async () => {
        await deleteAllUser()
    })
    const userPayload: IUser = {
        name: "Jane Doe",
        password: "aPassword123",
        email: "Jane@example.com",
    }
    describe("01. 测试 createUser() 方法", () => {
        describe("输入 name, password, email", () => {
            it("会创建一个用户", async () => {
                const user = await createUser(userPayload)
                expect(user.password).to.be.length(60)
                expect(user.name).to.be.equal(userPayload.name)
                expect(user.email).to.be.equal(userPayload.email)
            })
        })
    })

    // describe("02. 测试 registerUser() 方法", function () {
    //     describe("从客户端输入 name, password, email", function () {
    //         it("会注册一个用户", async () => {
    //             const user = await registerUser()
    //         })
    //     })
    // })
    
})

