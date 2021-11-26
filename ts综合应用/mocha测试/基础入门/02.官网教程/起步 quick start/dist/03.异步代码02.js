"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
// 这是一个 esm 模块, 如何在 mocha 中得到支持?
// import fetch from 'node-fetch'
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// import('node-fetch').then(v => console.log(v))
// ('https://api.gethub.com').then(v => console.log(v))
// 测试套件
describe("异步代码测试", function () {
    // 测试单元
    // it 块执行测试用例时, 有一个done 函数, 测试结束时, 必须显式
    // 调用 done , 告诉 mocha 测试结束了, 
    // 否则, mocha 无法知道测试是否结束, 会一直等待
    it("测试应该在 2000ms 后结束", function (done) {
        let x = true;
        const f = function () {
            x = false;
            (0, chai_1.expect)(x).to.be.not.ok;
            console.log("1000ms后在异步代码里运行这个函数");
            done(); // 通知 mocha 调式结束
        };
        setTimeout(f, 2000);
    });
    // it('异步请求返回一个对象', function (done){
    //     // 浏览器提供了这个对象, 但是node并没有
    //     fetch('https://api.github.com/users/defunkt').then(function (res){
    //         res.json().then(v => console.log(v))
    //         expect(res).to.be.an('object')
    //         done()
    //     })
    // })
});
// tsc --project tsconfig.json 03.异步代码02.ts
// 命令行运行 mocha --timeout 5000 -r esm 03.异步代码02.ts
