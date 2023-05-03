import path from "path"
import fs from "fs"

const reader: fs.ReadStream = fs.createReadStream(path.resolve(__dirname, "./img01.jpg"))
const writer: fs.WriteStream = fs.createWriteStream(path.resolve(__dirname, "./img01-copy.jpg"))

reader.on("data", (chunk) => {
  writer.write(chunk, () => {
    console.log("写入了一个文件")
  })
})

reader.on("end", () => {
  console.log("文件读取完成")
  // writer.close()
  reader.close()
})

writer.on("finish", () => {
  console.log("文件写入完成")
  writer.close()
  reader.close()
})

writer.on("close", () => {
  console.log("关闭了可写流")
})

// read.pipe(write)
