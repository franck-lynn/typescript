import fs from 'fs'


// 流读取
const rs = fs.createReadStream('./hello.txt') // 返回的是一个可读流
// console.log(rs)
rs.once('open', (fd) => {
    console.log("可读流打开了", fd)
})
rs.on('data', (datachunk) => {
    console.log('读取到的数据: ')
    console.log(datachunk.toString())
    // 内部调用 destroy()方法, 销毁读取流
    rs.destroy() 
})
rs.on('close', () => {
    console.log('流关闭了')
})
// 关闭是从末端关闭的, 就是说刚打开, 数据还在管子里面, 还没触发 'data'就关闭了
// 所以data事件没有数据显示出来
// rs.close() 



