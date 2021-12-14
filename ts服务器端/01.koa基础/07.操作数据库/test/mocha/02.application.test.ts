// https://www.jianshu.com/p/4f23c256f170#comments

import { expect } from "chai"
import request from "supertest"
// import {app} from "../../server/application"
// import app from "../../server/application"
import { User, IUser, UserDocument } from "../../server/models/user.model"
import {server} from './00.hook.test'
// 要使用 listen 返回值才可以 进行测试
// const server = app.listen(3000)

describe("二. 测试 koa app", function () {
    
    describe("01. 测试 服务器", function () {
        it("测试 register 路由", async () => {
            const userPayload: IUser = {
                name: "Jane Doe",
                password: "aPassword123",
                email: "Jane@example.com",
            };
            
            request(server)
              .post("/register")
              .send(userPayload)
              .set('Accept', 'application/json')
              .expect(200)
        })
    })
    
    
})


