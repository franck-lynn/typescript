### [【杰哥课堂】-项目实战-Node+Koa2从零搭建通用API服务](https://www.bilibili.com/video/BV13A411w79h?from=search&seid=17431296739412996968&spm_id_from=333.337.0.0)



# 一. 项目初始化

### 1. npm 初始化

```bash
npm init 
```

生成 package.json

### 2. git 初始化

```bash
在 vscode 中完成
```

### 3. 创建 readme.md 文件



# 二.  搭建项目

### 1. 安装 koa 框架

```bash
npm i koa
```

在 package.json 会多一个 dependences, 项目的依赖

新建一个 main.ts 文件

```ts
import Koa from "koa"
const app = new Koa()
app.listen(3000, () => {
    //! nodemon -r esm  05.koa-body.ts
    console.log("Server is running at http://localhost:3000")
})
```

上面是最基础的一个 koa 服务器

中间件

```ts
import Koa from "koa"
const app = new Koa()

// 中间件
app.use(async (ctx, next) => {
    const body = "hello koa"
})

app.listen(3000, () => {
    //! nodemon -r esm  05.koa-body.ts
    console.log("Server is running at http://localhost:3000")
})
```

我的 01.helloworld.ts 示例

```ts

import Koa from 'koa'

const app = new Koa()
app.use(async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello world'
    }
})

app.listen(3000, ()=> {
    console.log("Server is running at http://localhost:3000")
})

```

这时候, 无论是右键运行 code runner 或者 是 

```bash
nodemon -r esm 01.helloworld.ts
node -r esm 01.helloworld.ts
ts-node 01.helloworld.ts
```

都是可以的, 无需 tsconfig.json 或者 babel.config.json, 或者 tsc 进行转译, 因为是在服务端的, node 认识这些, 与浏览器端不同, 服务端是认识这些的

# 三. 项目的自动重启配置

- package.json

```json
{
    "scripts": {
        // 与 js 不一样, 使用 modemon 需要加上 -r esm 参数
        "dev": "nodemon -r esm src/01.helloworld.ts"
    }
}
```

-  .env

读取配置文件, 安装 dotenv

```bash
npm i dotenv
```

项目根目录下新建 .env

```txt
# .env 是键值对形式
APP_PORT=3000
```

- 新建 config/config.default.ts

```ts

import dotenv from 'dotenv' // 导入的是一个对象

dotenv.config()
// 也可以指定路径
// dotenv.congig({path: ".env"})
// 可以获取 .env 文件里定义的 APP_PORT
console.log(process.env.APP_PORT)

const APP_PORT = process.env.APP_PORT


export {
    APP_PORT 
}
```

使用时, 在 01.helloworld.ts 导入

```ts
// 可以使用解构的方式把这个环境中的 APP_PORT 解构出来
import {APP_PORT} from './config/config.default'
```

# 四. 添加路由, 处理不同的 url 请求





































