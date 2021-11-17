// 断言
import {assert, expect} from 'chai'

const foo = 'bar'


describe("练习使用断言库 assert", function (){
    it("类型断言 typeof", function (){
        // 断言 foo 是一个字符串
        assert.typeOf(foo, 'string')
    })
    it("类型断言 typeof, 带一个消息", function (){
        // 断言 foo 是一个字符串, 如果出现不通过的情况, 这个消息会显示出来
        assert.typeOf(foo, 'string', 'foo is a string: ')
    })
})


describe("练习使用断言库 BDD风格", function (){
    it('foo的长度', function (){
        expect(foo).to.have.lengthOf(3)
    })
})

// mocha assert.test.ts 命令行运行


// https://www.youtube.com/watch?v=89fbpmdXyHo
// https://www.youtube.com/watch?v=tC91t9OvVHA
