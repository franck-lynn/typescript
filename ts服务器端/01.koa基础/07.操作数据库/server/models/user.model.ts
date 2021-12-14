import { CallbackError, model, Schema, Document } from "mongoose"
import { genSalt, hashSync, compare } from "bcryptjs"
//! 1. 定义接口
export interface IUser {
    name: string
    email: string
    password: string
}
export interface UserDocument extends IUser, Document {
    status: string
    meta: {
        createdAt: Date
        updateAt: Date
    }
    avatar?: string
    comparePassword: (CandidatePassword: string) => Promise<boolean>
}
//! 2. 定义schema
const userSchema = new Schema<UserDocument>({
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
userSchema.index({email: 1})
// https://www.v2ex.com/amp/t/498008
userSchema.pre("save", async function (this: UserDocument, next: (err?: CallbackError) => void) {
    // 修改时间
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = new Date()
    } else {
        this.meta.updateAt = new Date()
    }
    // 没有修改密码, 直接运行下一步
    if (!this.isModified("password")) {
        return next()
    } else {
        // 随机盐
        const salt = await genSalt(12)
        const hash = hashSync(this.password, salt)
        this.password = hash
        return next()
    }
})

// 比较密码
userSchema.methods.comparePassword = async function (CandidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    return compare(CandidatePassword, user.password).catch((e: Error) => false)
}

//! 3. 创建 model
const User = model<UserDocument>("User", userSchema)

export { User }
