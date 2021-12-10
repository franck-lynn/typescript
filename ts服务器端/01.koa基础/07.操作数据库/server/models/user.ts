import { model, Schema } from "mongoose"
//! 1. 定义接口
interface IUser {
    name: string
    email: string
    password: string
    status: string
    meta: {
        createdAt: Date
        updateAt: Date
    }
    avatar?: string
}
//! 2. 定义schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "pending" },
    meta: {
        createdAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() },
    },
    avatar: { type: String },
})

// https://www.v2ex.com/amp/t/498008
userSchema.pre("save", function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

//! 3. 创建 model
const User = model<IUser>("User", userSchema)

export { User }
export {IUser}