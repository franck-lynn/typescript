/**
 * Created by franck.lynn on 2021-12-09.
 * lry_demry@163.com
 * filename:  index.ts
 * 一些环境变量的处理
 */
// 获取环境配置中的变量
import dotenv from "dotenv"

//! 这里的路径是以 package.json 文件的路径开始计算的
dotenv.config({ path: "./.env" })

const { HOST_NAME, PORT, MONGO_URI} = process.env
export { HOST_NAME, PORT, MONGO_URI }
