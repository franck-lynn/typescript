

import mongoose, {model, Schema, PopulatedDoc, Document, Query, Model} from "mongoose"

const url = "mongodb://localhost:27017/test"


mongoose.connect(url, () => console.log("数据库连接成功"))
mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))

interface IUser {
    name: string
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true}
})
const User = model<IUser>("User", userSchema)


describe('User', function (){
    describe("#save()", function (){
        it('should save without error', function (done){
            const user = new User({name: 'Luna'})
            user.save((err: mongoose.CallbackError ) => {
                mongoose.disconnect()
                if(err) done(err)
                else done()
            })
          
        })
    })
})