import axios from 'axios'
import {expect} from 'chai'

describe("Random", async function (){
    it("should get a new joke upon each request", async function (done: Mocha.Done){
        console.log("打印一下看看 ---> ")
        
        const joke1 = await axios.get("https://api.chucknorris.io/jokes/random")
        const joke2 = await axios.get("https://api.chucknorris.io/jokes/random")
        
        console.log(joke1)
        expect(joke1.data.value).not.to.be.equal(joke2.data.value)
        done()
    })
})


// cross-env TS_NODE_PROJECT='tsconfig.test.json' mocha src/05.axios测试.ts --timeout 5000