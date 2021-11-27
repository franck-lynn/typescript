
import {MongoClient} from 'mongodb'

//! 连接数据库的 uri
const uri = "mongodb://127.0.0.1:27017"
//! 数据库客户端连接对象
const client = new MongoClient(uri)


beforeEach(async function() {
    console.log("beforeEach() 执行")
    //! 等待数据量连接好
    await client.connect()
    //! 连接到哪个数据库
    let db = client.db('test')
    console.log(db)
    // 建立集合
    const coll = db.collection('movies')
    // 创建要插入的数据
    const users = ['tobi', 'loki', 'jane']
    // 保存数据
    const result = await coll.insertOne(users)
    console.log(`_id是 ${result.insertedId} 被插入集合 users`)
})


// describe("# find()", function (){
//     it("返回匹配的数据", async() => {
//         // 查询数据
//         // 判断
//     })
// })

// mocha --require ts-node/register 04.使用AsyncAwait.ts