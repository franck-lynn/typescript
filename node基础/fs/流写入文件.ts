import fs from 'fs'

// 创建一个可写流
// 水管已经接上了
const ws = fs.createWriteStream('./hello.txt')
// 通过流向文件输出内容, 只有流存在, 就可以持续写入
ws.write('通过可写流写入的内容')
ws.write('锄禾日当午')
ws.write('今天天气不错')
ws.write('红掌拨清波')
// 监听流的 open 和 close, 
// on 绑定事件(事件字符串, 回调函数)
// once 一次性的事件, 触发一次后自动去掉
// 
ws.once('open', (fd) => {
    console.log('流打开了', fd)
})
ws.on('close', () => {
    console.log('流关闭了')
})

// 从源头关闭流, close()是从末端关闭流, 会造成还在水管中的文件写不过去, 管子就拔掉了
ws.end() 