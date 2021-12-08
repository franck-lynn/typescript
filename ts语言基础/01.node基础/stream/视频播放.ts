import http, { IncomingMessage, ServerResponse } from "http"
import fs from "fs"
import { stat } from "fs/promises"

// const videoPath = "G:/movies/导航/mv/mv/mpg/oumei/penthousePleasure1.avi"
const videoPath = "./03.许茹芸.-.[独角戏].MV.avi"

http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<video src="03.许茹芸.-.[独角戏].MV.avi" width="500 controls="controls></video>`)
    } else{
        fs.createReadStream(videoPath).pipe(res)
    }
    // else if (req.url === "/video") {
        // const range = req.headers["range"]
        // if (range) {
        //     const stats = await stat(videoPath)
        //     const r = range.match(/=(\d+)-(\d+)?/)
        //     const start = parseInt(r[1], 10)
        //     let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024
        //     if (end > stats.size - 1) end = stats.size - 1
        //     const head = {
        //         "Content-type": "video/mp4",
        //         "Content-Range": `bytes ${start}-${end}/${stats.size} `,
        //         "Accept-Ranges": "bytes",
        //     }
        //     res.writeHead(206, head)
        //     fs.createReadStream(videoPath, { start, end }).pipe(res)
        // } else {
        //     fs.createReadStream(videoPath).pipe(res)
        // }
    // }
}).listen(3000, () => {
    console.log("服务器运行 http://localhost:3000")
})
// nodemon --watch 视频播放.ts --exec ts-node 视频播放.ts
// nodemon -e  ts,tsx  --exec ts-node  视频播放.ts
