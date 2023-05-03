// import { unlink } from "node:fs/promises"

import { readFile } from "./fs/fs-readFile"
import { write2File } from "./fs/fs-writeFile"

await readFile()
await write2File()

// 删除文件, 在项目根目录 05.node最简环境下,
// 相对路径是从 server 开始的
// try {
//   await unlink("./server/src/fs/00.my-writedFile.txt")
//   console.log("成功删除文件")
// } catch (error) {
//   console.error("这里有一个错误: ", error)
// }
import { FileHandle, open } from "node:fs/promises"

let filehandle: FileHandle | null = null
try {
  // 不同的打开方式有不同的操作
  // https://www.runoob.com/nodejs/nodejs-fs.html
  // Flag	描述
  // r	以读取模式打开文件。如果文件不存在抛出异常。
  // r+	以读写模式打开文件。如果文件不存在抛出异常。
  // rs	以同步的方式读取文件。
  // rs+	以同步的方式读取和写入文件。
  // w	以写入模式打开文件，如果文件不存在则创建。
  // wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
  // w+	以读写模式打开文件，如果文件不存在则创建。
  // wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
  // a	以追加模式打开文件，如果文件不存在则创建。
  // ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
  // a+	以读取追加模式打开文件，如果文件不存在则创建。
  // ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
  filehandle = await open("./server/src/fs/00.my-writedFile.txt", "a")
  console.log("文件描述符---> ", filehandle.fd)
  filehandle.appendFile("附加的内容")
} finally {
  await filehandle?.close()
}
