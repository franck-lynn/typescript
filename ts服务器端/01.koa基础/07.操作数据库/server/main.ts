// import { app } from "./application"
import app from "./application"
import { HOST_NAME, PORT } from "./contstants"

app.listen(PORT, () => {
    console.log(`Server is running at ${HOST_NAME}:${PORT}`)
})

// 运行
// 直接 右键运行
// 或者 在 package 所在目录
// nodemon -r esm app.ts
// ts-node app.ts
// 或者  npm run dev
