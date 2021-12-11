
const done = () => {
    console.log("回调函数")
}

it("double done()", function (done){
    // 检测多个回调
    setImmediate(done)
    setImmediate(done)
})

