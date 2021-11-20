import assert from 'assert'
// const assert = require('assert')
describe("Array", function (){
    describe("indexOf", function (){
        it('should return -1 when value is not present', function (){
            assert.equal([1,2, 3].indexOf(4), -1)
        })
    })
})

// https://www.npmjs.com/package/ts-node
// ts-node 运行 mocha 的运行命令
// 运行这个命令需要 tsconfig.json
// mocha --require ts-node/register 01.开始.ts