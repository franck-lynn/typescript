"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
//! 连接数据库的 uri
const uri = "mongodb://127.0.0.1:27017";
//! 数据库客户端连接对象
const client = new mongodb_1.MongoClient(uri);
beforeEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("beforeEach() 执行");
        //! 等待数据量连接好
        yield client.connect();
        //! 连接到哪个数据库
        let db = client.db('test');
        console.log(db);
        // 建立集合
        const coll = db.collection('movies');
        // 创建要插入的数据
        const users = ['tobi', 'loki', 'jane'];
        // 保存数据
        const result = yield coll.insertOne(users);
        console.log(`_id是 ${result.insertedId} 被插入集合 users`);
    });
});
// describe("# find()", function (){
//     it("返回匹配的数据", async() => {
//         // 查询数据
//         // 判断
//     })
// })
// https://segmentfault.com/a/1190000011362879
// mocha --require ts-node/register 04.使用AsyncAwait.ts
