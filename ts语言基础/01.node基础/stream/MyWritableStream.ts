// 实现一个可写流
import { Writable } from 'stream'

const outStream = new Writable({
    write: (chunk, encoding, callback) => {
        console.log(chunk.toString())
        callback()
    }
})
// 当我们运行上面的代码时，我们键入到 process.stdin 
// 的任何字符都会被 outStream 的 console.log 打印出来。
// 这并不是一个有用的实现的流，因为已经内置实现了。等价于 
// process.stdou。我们可以直接将 stdin 导入到 stdout 中，
// 仅仅一行就实现了相同的特性：
process.stdin.pipe(outStream)
