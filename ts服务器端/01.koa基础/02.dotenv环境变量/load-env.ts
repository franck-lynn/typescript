// 读取文件中读取环境变量
import dotenv from 'dotenv'
dotenv.config({path: '.env'})
console.log(
    "读取到的环境变量", process.env.MODE
)
