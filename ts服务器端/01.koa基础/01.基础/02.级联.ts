import Koa from 'koa'

const app = new Koa()
//! 这是典型的洋葱模型
// logger
app.use(async (ctx, next) => {
    await next()
    // 响应时间
    const rt = ctx.response.get('X-Response-Time')
    //! 3. 执行打印时间
    console.log(`请求方法--> ${ctx.method}, 请求 url--> ${ctx.url} - 请求时间--> ${rt}`);
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // 设置响应头 X-Response-Time, 用于记录时间
    //! 2. 执行设置时间
    ctx.set('X-Response-Time', `${ms}ms`);
  }) 
  
  // response
  app.use(async ctx => {
    //! 1.首先执行
    ctx.body = 'Hello World';
  }) 
  app.listen(3000, ()=> {
    //! nodemon -r esm 02.级联.ts
    console.log("Server is running at http://localhost:3000")
})

