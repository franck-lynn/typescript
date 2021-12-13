
import mongoose from "mongoose"
import app from '../../server/application'
import { PORT } from '../../server/contstants'
before(async () => {
    
    
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri)
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})

after(async (done) => {
    mongoose.disconnect()
    done()
})