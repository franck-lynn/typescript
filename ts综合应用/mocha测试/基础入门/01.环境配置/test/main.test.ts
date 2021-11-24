import 'mocha'
import { expect } from 'chai'
// import { spy } from 'sinon'

/**
 * 测试函数
 * 接受一个函数，并在返回函数每次调用时给其传入一个闭包的累加值
 */
//  const testFunc = function (callback: (num: number) => any): () => void {
//     let localValue = 0;
//     return () => callback(localValue ++)
// }

// describe('testFunc 测试', function () {
//     it('可以正常累加', function () {
//         const mockCallback = spy();

//         const work = testFunc(mockCallback);
//         work();
//         work();
//         work();

//         expect(mockCallback.callCount).to.be.equal(3);
//         expect(mockCallback.args).to.be.deep.equal([[0], [1], [2]]);
//     })
// })

import {add, minus} from '../src/main'

// 描述测试用例
describe('测试main.ts文件', function (){
    // 描述这个文件里的方法
    describe("测试相加的方法", function (){
        it('2+3', function (){
            expect(add<number>(2,3)).to.be.equal(5)
        })
        // 写一个测试不通过的用例
        it('a+b', function (){
            expect(add<string>('a','b')).to.be.equal('ab')
        })
    })
    describe("测试相减的方法", function (){
        it('5-2', function (){
            expect(minus(5, 2)).to.be.equal(3)
        })
    })
})

