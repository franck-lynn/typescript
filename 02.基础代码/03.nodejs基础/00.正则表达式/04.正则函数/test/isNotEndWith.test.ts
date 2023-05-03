import { expect } from "chai"
import { isNotEndWith } from "../src/isNotEndWith"

describe("测试 isNotEndWith() 函数", () => {
    describe("不是 js/ts 文件", () => {
        it("这个确实不是ts/js结尾的文件, 会返回 true", () => {
            const result = isNotEndWith("index.jpg", ".js|ts")
            expect(result).to.be.equal(true)
        })
    })
})


