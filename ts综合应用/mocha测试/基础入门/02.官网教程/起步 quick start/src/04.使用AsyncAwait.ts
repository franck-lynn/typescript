
import {MongoClient} from 'mongodb'



const uri = "mongodb://127.0.0.1:27017"

const client = new MongoClient(uri)


beforeEach(async function() {
    await client.connect()
    let db = client.db('test')
    // 清空数据库
    await db.dropDatabase()
    db = client.db('test')
    // 建立集合
    const coll = db.collection('users')
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