
// 读取.env文件中设置的值 
import dotenv from 'dotenv'
const MODE = dotenv.config({path: '.env'}).parsed!.MODE 
// 直接运行 code-runner 就可以得到 .env 文件中配置的对象环境变量值
console.log(MODE)