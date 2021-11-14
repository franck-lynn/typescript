
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
