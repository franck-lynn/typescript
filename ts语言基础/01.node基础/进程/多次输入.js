process.stdout.write('请输入: ')
// 设置编码
process.stdin.setEncoding('utf8')
let n = 0
process.stdin.on('data', (input) => {
    n++
    if(n === 1){
        console.log(`第${n}次输入 ${input}`)
        //  console.log("----------", input.toString().trim() === 'aaa')
        if (input.toString().trim()) {
            
            process.stdout.write("请重新输入: ")
            n--
            return
        }
        // console.log("----------", input )
    }
    if(n === 2){
        console.log(`第2次输入 ${input}`)
    }
    
})