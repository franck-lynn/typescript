import fs from "fs"

fs.stat('./hello.txt', (err, stats) => {
    // stats 是当前文件信息
    console.log("是文件吗--> ", stats.isFile())
    console.log("是目录吗--> ", stats.isDirectory())
    console.log("是不是块设备-->", stats.isBlockDevice())
})
