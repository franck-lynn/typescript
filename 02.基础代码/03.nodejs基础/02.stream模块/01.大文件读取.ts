import path from "path"
import fs from "fs"

// fs.readFile(path.resolve(__dirname, "./img01.jpg"), (err, data) => {
//   console.log(data.length)
// })

let len = 0
const read: fs.ReadStream = fs.createReadStream(path.resolve(__dirname, "./img01.jpg"))
read.on("data", (chunk) => {
  console.log(chunk.length)
  len += chunk.length
})
read.on("end", () => {
  console.log("总大小为: ", len)
  read.close()
})
